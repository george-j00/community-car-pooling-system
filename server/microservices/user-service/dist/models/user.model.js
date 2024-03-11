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
    phoneNumber: {
        type: String,
    },
    profileCompletionStatus: {
        type: String, enum: ["Complete", "Incomplete"],
        default: "Incomplete",
    },
    password: {
        type: String,
        required: true,
    },
    driverLicenseNumber: {
        type: String,
    },
    car: {
        carName: { type: String },
        type: { type: String },
        model: { type: String },
        capacity: { type: Number, min: 1, max: 6 },
        vehicleNumber: { type: String, minlength: 4 },
        fuelType: { type: String, enum: ["Petrol", "Diesel", "Electric"] },
    },
    status: {
        type: String,
        enum: ["active", "banned"],
        default: "active",
    },
});
exports.UserModel = mongoose_1.default.model("UserModel", userSchema);
