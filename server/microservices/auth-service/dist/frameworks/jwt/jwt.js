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
    generateToken(email) {
        return jsonwebtoken_1.default.sign({ email }, this.secretKey, { expiresIn: '15m' });
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secretKey);
        }
        catch (error) {
            console.error('JWT verification failed:', error);
            return null;
        }
    }
}
exports.JwtService = JwtService;
