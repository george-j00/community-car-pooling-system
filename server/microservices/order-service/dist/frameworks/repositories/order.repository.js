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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
class OrderRepository {
    constructor(OrderModel) {
        this.OrderModel = OrderModel;
    }
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOrder = new this.OrderModel(order);
            return yield newOrder.save();
        });
    }
    getAllOrders(loggedUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const allOrders = yield this.OrderModel.find({ userId: loggedUserId });
            return allOrders;
        });
    }
    getSingleOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.OrderModel.findById(orderId);
            const bookedSeats = order === null || order === void 0 ? void 0 : order.bookedSeatsCount;
            return bookedSeats;
        });
    }
    getPassengersList(rideId, driverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.OrderModel.find({ driverId: driverId, rideId: rideId }, { _id: 0, userId: 1 });
            return users;
        });
    }
}
exports.OrderRepository = OrderRepository;
