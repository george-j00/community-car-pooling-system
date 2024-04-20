"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
class OrderRepository {
    constructor(OrderModel) {
        this.OrderModel = OrderModel;
    }
    createOrder(order) {
        console.log('the created order', order);
        throw new Error("Method not implemented.");
    }
}
exports.OrderRepository = OrderRepository;
