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
exports.AuthRepository = void 0;
const auth_model_1 = require("../../models/auth.model");
class AuthRepository {
    constructor(authModel, rabbitMq) {
        this.AuthModel = authModel;
        this.RabbitMq = rabbitMq;
    }
    register(authCredentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new this.AuthModel(authCredentials);
                yield newUser.save();
            }
            catch (error) {
                console.error("Registration failed:", error);
                throw new Error("Registration failed");
            }
        });
    }
    validateOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingData = yield auth_model_1.AuthModel.findOne({ email: email });
                if (!existingData) {
                    throw new Error("User not found");
                }
                if (existingData.otp !== otp ||
                    Date.now() - existingData.createdAt.getTime() > 60000) {
                    console.log("OTP validation failed due to timeout");
                    return false;
                }
                console.log("OTP validation sucessfully completed");
                yield this.RabbitMq.publishUserRegisteredEvent(existingData);
                return true;
            }
            catch (error) {
                console.error("OTP validation failed:", error);
                throw new Error("OTP validation failed");
            }
        });
    }
    login(email, password) {
        throw new Error("Method not implemented.");
    }
}
exports.AuthRepository = AuthRepository;
