"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: "string",
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    car: {
        carName: { type: String, required: true },
        type: { type: String },
        model: { type: String },
        capacity: { type: Number, min: 1, max: 6 },
        vehicleNumber: { type: String, minlength: 4 },
        fuelType: { type: String, enum: ["Petrol", "Diesel", "Electric"] },
    },
});
exports.UserModel = mongoose_1.default.model("UserModel", userSchema);
