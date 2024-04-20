"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    stripeId: { type: String, required: true },
    rideId: { type: String, default: '' },
    userId: { type: String, default: '' },
    driverId: { type: String, default: '' },
    source: { type: String, default: '' },
    destination: { type: String, default: '' },
    distance: { type: String, default: '' },
    totalAmount: { type: String, default: '0' },
    createdAt: { type: Date, default: Date.now }
});
exports.OrderModel = mongoose_1.default.model("OrderModel", orderSchema);
