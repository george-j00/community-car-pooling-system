"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderEntity = void 0;
class OrderEntity {
    constructor(stripeId, rideId, userId, driverId, source, destination, distance, totalAmount, createdAt) {
        this.stripeId = stripeId;
        this.rideId = rideId;
        this.userId = userId;
        this.driverId = driverId;
        this.source = source;
        this.destination = destination;
        this.distance = distance;
        this.totalAmount = totalAmount;
        this.createdAt = createdAt;
    }
}
exports.OrderEntity = OrderEntity;
