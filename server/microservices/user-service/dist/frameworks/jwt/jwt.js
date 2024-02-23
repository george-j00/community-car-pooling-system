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
}
exports.JwtService = JwtService;
