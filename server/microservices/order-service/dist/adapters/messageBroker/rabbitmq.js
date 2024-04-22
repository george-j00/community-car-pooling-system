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
                const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://localhost:5672";
                this.connection = yield amqplib_1.default.connect(rabbitmqUrl);
                this.channel = yield this.connection.createChannel();
                console.log("The connection is established");
            }
            catch (error) {
                console.error("Failed to establish connection to RabbitMQ:", error);
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
    fetchCompleteOrder(rideId, driverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rideRequestQueue = "ride_queue";
                const driverRequestQueue = "driver_queue";
                const responseQueue1 = "response_queue1";
                const responseQueue2 = "response_queue2";
                const channel = yield this.ensureChannel();
                const rideCorrelationId = this.generateCorrelationId();
                const driverCorrelationId = this.generateCorrelationId();
                const message1 = JSON.stringify({ rideId });
                const message2 = JSON.stringify({ driverId });
                yield (channel === null || channel === void 0 ? void 0 : channel.assertQueue(responseQueue1, { durable: false }));
                yield (channel === null || channel === void 0 ? void 0 : channel.assertQueue(responseQueue2, { durable: false }));
                this.consumeResponseQueue();
                const responsePromise1 = new Promise((resolve) => {
                    this.correlationIdMap.set(rideCorrelationId, resolve);
                });
                const responsePromise2 = new Promise((resolve) => {
                    this.correlationIdMap.set(driverCorrelationId, resolve);
                });
                yield (channel === null || channel === void 0 ? void 0 : channel.assertQueue(rideRequestQueue, { durable: false }));
                yield (channel === null || channel === void 0 ? void 0 : channel.assertQueue(driverRequestQueue, { durable: false }));
                channel === null || channel === void 0 ? void 0 : channel.sendToQueue(rideRequestQueue, Buffer.from(message1), {
                    correlationId: rideCorrelationId,
                    replyTo: responseQueue1,
                });
                channel === null || channel === void 0 ? void 0 : channel.sendToQueue(driverRequestQueue, Buffer.from(message2), {
                    correlationId: driverCorrelationId,
                    replyTo: responseQueue2,
                });
                const [response1, response2] = yield Promise.all([
                    responsePromise1,
                    responsePromise2,
                ]);
                return Object.assign(Object.assign({}, response1), response2);
            }
            catch (error) {
                console.error("Error fetching complete order data:", error);
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
                channel === null || channel === void 0 ? void 0 : channel.consume("response_queue1", (msg) => {
                    if (msg && msg.properties.correlationId) {
                        const correlationId = msg.properties.correlationId;
                        const response = JSON.parse(msg.content.toString());
                        this.handleResponse(correlationId, response);
                    }
                }, { noAck: true });
                channel === null || channel === void 0 ? void 0 : channel.consume("response_queue2", (msg) => {
                    if (msg && msg.properties.correlationId) {
                        const correlationId = msg.properties.correlationId;
                        const response = JSON.parse(msg.content.toString());
                        this.handleResponse(correlationId, response);
                    }
                }, { noAck: true });
            }
            catch (error) {
                console.error("Error consuming response queues:", error);
                throw error;
            }
        });
    }
}
exports.RabbitMQService = RabbitMQService;
