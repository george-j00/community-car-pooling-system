"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtService {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    generateToken(userName, email) {
        const payload = {
            userName: userName,
            email: email
        };
        return jsonwebtoken_1.default.sign(payload, this.secretKey, { expiresIn: '15m' });
    }
}
exports.JwtService = JwtService;
