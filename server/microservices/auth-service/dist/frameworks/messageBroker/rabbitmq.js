"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQService = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
class RabbitMQService {
    constructor() {
        this.connection = null;
        this.channel = null;
        this.correlationIdMap = new Map();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
                this.connection = yield amqplib_1.default.connect(rabbitmqUrl);
                this.channel = yield this.connection.createChannel();
                console.log('The connection is established');
            }
            catch (error) {
                console.error('Failed to establish connection to RabbitMQ:', error);
                throw error;
            }
        });
    }
    ensureChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.channel) {
                yield this.initialize();
            }
            return this.channel;
        });
    }
    userRegPublisher(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = yield this.ensureChannel();
                const queue = 'userReg';
                yield (channel === null || channel === void 0 ? void 0 : channel.assertQueue(queue, { durable: true }));
                channel === null || channel === void 0 ? void 0 : channel.sendToQueue(queue, Buffer.from(JSON.stringify(userData)));
                console.log('The user data passed successfully');
            }
            catch (error) {
                console.error('Failed to publish user registration data:', error);
                throw error;
            }
        });
    }
    checkUserExistence(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestQueue = 'user_email_check_queue';
                const responseQueue = 'response_queue';
                const channel = yield this.ensureChannel();
                const correlationId = this.generateCorrelationId();
                const message = JSON.stringify(email);
                yield (channel === null || channel === void 0 ? void 0 : channel.assertQueue(responseQueue, { durable: false }));
                this.consumeResponseQueue();
                const responsePromise = new Promise((resolve) => {
                    this.correlationIdMap.set(correlationId, resolve);
                });
                yield (channel === null || channel === void 0 ? void 0 : channel.assertQueue(requestQueue, { durable: false }));
                channel === null || channel === void 0 ? void 0 : channel.sendToQueue(requestQueue, Buffer.from(message), {
                    correlationId,
                    replyTo: responseQueue,
                });
                const response = yield responsePromise;
                console.log('Received response:', response);
                // if (response === 'false') {
                //     return null;
                // }
                return response;
            }
            catch (error) {
                console.error('Error publishing user existence data:', error);
                throw error;
            }
        });
    }
    publishLoginData(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = yield this.ensureChannel();
                const correlationId = this.generateCorrelationId();
                const message = JSON.stringify(loginData);
                yield (channel === null || channel === void 0 ? void 0 : channel.assertQueue('response_queue', { durable: false }));
                this.consumeResponseQueue();
                const responsePromise = new Promise((resolve) => {
                    this.correlationIdMap.set(correlationId, resolve);
                });
                yield (channel === null || channel === void 0 ? void 0 : channel.assertQueue('login_queue', { durable: false }));
                channel === null || channel === void 0 ? void 0 : channel.sendToQueue('login_queue', Buffer.from(message), {
                    correlationId,
                    replyTo: 'response_queue',
                });
                const response = yield responsePromise;
                console.log('Received response:', response);
                if (response === 'false') {
                    return null;
                }
                return response;
            }
            catch (error) {
                console.error('Error publishing login data:', error);
                throw error;
            }
        });
    }
    generateCorrelationId() {
        return Math.random().toString() + Date.now().toString();
    }
    handleResponse(correlationId, response) {
        const resolveFunction = this.correlationIdMap.get(correlationId);
        if (resolveFunction) {
            resolveFunction(response);
            this.correlationIdMap.delete(correlationId);
        }
    }
    consumeResponseQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = yield this.ensureChannel();
                channel === null || channel === void 0 ? void 0 : channel.consume('response_queue', (msg) => {
                    if (msg && msg.properties.correlationId) {
                        const correlationId = msg.properties.correlationId;
                        const response = msg.content.toString();
                        this.handleResponse(correlationId, response);
                    }
                }, { noAck: true });
            }
            catch (error) {
                console.error('Error consuming response queue:', error);
                throw error;
            }
        });
    }
}
exports.RabbitMQService = RabbitMQService;
