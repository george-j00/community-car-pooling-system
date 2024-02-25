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
exports.rabbitmq = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
class rabbitmq {
    constructor(userUsecases) {
        this.userUsecases = userUsecases;
        this.Connection = null;
        this.Channel = null;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rabbitmqUrl = "amqp://localhost:5672";
                this.Connection = yield amqplib_1.default.connect(rabbitmqUrl);
                this.Channel = yield this.Connection.createChannel();
                console.log("the connection is established");
            }
            catch (err) {
                console.log(err, "the connection is not established");
                process.exit(1);
            }
        });
    }
    userRegConsumer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Channel) {
                yield this.initialize();
            }
            if (this.Channel) {
                const queue = "userReg";
                yield this.Channel.assertQueue(queue, { durable: true });
                yield this.Channel.consume(queue, (msg) => {
                    if (msg !== null && msg.content) {
                        try {
                            console.log('row message ', msg);
                            const data = JSON.parse(msg.content.toString());
                            console.log("Received message:", data);
                            this.userUsecases.register(data);
                        }
                        catch (error) {
                            console.error("Error parsing message content:", error);
                            console.log("Raw message content:", msg.content.toString());
                        }
                    }
                }, { noAck: true });
            }
            else {
                console.error("Failed to create a channel");
            }
        });
    }
    userLoginConsumer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Channel) {
                yield this.initialize();
            }
            if (this.Channel) {
                yield this.Channel.assertQueue('response_queue', { durable: false });
                const queue = 'login_queue';
                yield this.Channel.assertQueue(queue, { durable: false });
                this.Channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                    if (msg !== null && msg.content) {
                        try {
                            console.log('Raw login message:', msg);
                            const loginData = JSON.parse(msg.content.toString());
                            console.log('Received login message:', loginData);
                            const { email, password } = loginData;
                            const loginResult = yield this.userUsecases.login(email, password);
                            const correlationId = msg.properties.correlationId;
                            const responseQueue = msg.properties.replyTo;
                            if (correlationId && responseQueue) {
                                const responseMessage = JSON.stringify(loginResult);
                                yield this.Channel.sendToQueue(responseQueue, Buffer.from(responseMessage), {
                                    correlationId,
                                });
                                console.log('Login response sent:', responseMessage);
                            }
                        }
                        catch (error) {
                            console.error('Error parsing login message content:', error);
                            console.log('Raw login message content:', msg.content.toString());
                        }
                    }
                }), { noAck: true });
            }
            else {
                console.error("Failed to create a channel");
            }
        });
    }
}
exports.rabbitmq = rabbitmq;
