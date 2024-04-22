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
    getAllOrders(loggedUserId) {
        return this.orderRepository.getAllOrders(loggedUserId);
    }
    getSingleOrder(orderId) {
        return this.orderRepository.getSingleOrder(orderId);
    }
    getPassengersList(rideId, driverId) {
        return this.orderRepository.getPassengersList(rideId, driverId);
    }
}
exports.OrderUsecase = OrderUsecase;
