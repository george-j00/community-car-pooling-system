"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderUsecase = void 0;
class OrderUsecase {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    createOrder(order) {
        return this.orderRepository.createOrder(order);
    }
}
exports.OrderUsecase = OrderUsecase;
