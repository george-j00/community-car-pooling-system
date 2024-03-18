"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const rideSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
    pickupTime: { type: String, required: true },
    dropOffTime: { type: String, required: true },
    distance: { type: String, required: true },
    duration: { type: String, required: true },
    rate: { type: String, required: true },
    seatAvailable: { type: Number, required: true, default: 1 },
});
exports.RideModel = mongoose_1.default.model("RideModel", rideSchema);
