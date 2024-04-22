"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = exports.OrderRouter = void 0;
const express_1 = require("express");
const order_repository_1 = require("../../frameworks/repositories/order.repository");
const order_schema_1 = require("../../frameworks/models/order.schema");
const order_usecase_1 = require("../../usecases/order.usecase");
const order_controller_1 = require("../controllers/order.controller");
const rabbitmq_1 = require("../messageBroker/rabbitmq");
class OrderRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.orderRepository = new order_repository_1.OrderRepository(order_schema_1.OrderModel);
        this.orderUsecase = new order_usecase_1.OrderUsecase(this.orderRepository);
        this.rabbitMq = new rabbitmq_1.RabbitMQService();
        this.controller = new order_controller_1.OrderController(this.orderUsecase, this.rabbitMq);
        this.router.post("/api/orders/book-ride", (req, res) => {
            this.controller.create_order(req, res);
        });
        this.router.post("/api/orders/getAllOrders", (req, res) => {
            this.controller.getAllOrders(req, res);
        });
        this.router.post("/api/orders/getCompleteData", (req, res) => {
            this.controller.getSingleOrder(req, res);
        });
        this.router.post("/api/orders/get-passengers-list", (req, res) => {
            this.controller.getPassengersList(req, res);
        });
    }
}
exports.OrderRouter = OrderRouter;
exports.orderRouter = new OrderRouter().router;
