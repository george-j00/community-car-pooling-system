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
    constructor(rideUsecase) {
        this.rideUsecase = rideUsecase;
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
    fetchUserConsumer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Channel) {
                yield this.initialize();
            }
            if (this.Channel) {
                yield this.Channel.assertQueue("response_queue2", { durable: false });
                const queue = "ride_queue";
                yield this.Channel.assertQueue(queue, { durable: false });
                this.Channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                    if (msg !== null && msg.content) {
                        try {
                            console.log("Raw message with ride id :", msg);
                            const rideData = JSON.parse(msg.content.toString());
                            console.log("Received ride id message:", rideData);
                            const { rideId } = rideData;
                            const userData = yield this.rideUsecase.getRideById(rideId);
                            const correlationId = msg.properties.correlationId;
                            const responseQueue = msg.properties.replyTo;
                            if (correlationId && responseQueue) {
                                const responseMessage = JSON.stringify(userData);
                                yield this.Channel.sendToQueue(responseQueue, Buffer.from(responseMessage), {
                                    correlationId,
                                });
                                console.log("ride response sent:", responseMessage);
                            }
                        }
                        catch (error) {
                            console.error("Error parsing driver id  message content:", error);
                            console.log("Raw driver message content:", msg.content.toString());
                        }
                    }
                }), { noAck: true });
            }
            else {
                console.error("Failed to create a channel");
            }
        });
    }
    reduceSeatAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Channel) {
                yield this.initialize();
            }
            if (this.Channel) {
                const queue = "seatAvailabilityQueue";
                yield this.Channel.assertQueue(queue, { durable: true });
                yield this.Channel.consume(queue, (msg) => {
                    if (msg !== null && msg.content) {
                        try {
                            console.log("row message ", msg);
                            const data = JSON.parse(msg.content.toString());
                            console.log("Received message:", data);
                            this.rideUsecase.reduceSeatAvailable(data);
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
}
exports.rabbitmq = rabbitmq;
