"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_usecase_1 = require("../../domain/usecases/auth.usecase");
const auth_repository_1 = require("../repositories/auth.repository");
const auth_model_1 = require("../../models/auth.model");
const rabbitmq_1 = require("../../frameworks/messageBroker/rabbitmq");
const jwt_1 = require("../../frameworks/jwt/jwt");
class AuthRouter {
    constructor() {
        this.secret_key = "secret_key";
        this.jwt = new jwt_1.JwtService(this.secret_key);
        this.router = (0, express_1.Router)();
        this.rabbitMq = new rabbitmq_1.RabbitMQService();
        this.authRepository = new auth_repository_1.AuthRepository(auth_model_1.AuthModel, this.rabbitMq);
        this.authUsecase = new auth_usecase_1.AuthUsecase(this.authRepository, this.rabbitMq, this.jwt);
        this.authController = new auth_controller_1.AuthController(this.authUsecase, this.rabbitMq);
        this.router.post("/api/auth/register", (req, res) => {
            this.authController.register_user(req, res);
        });
        this.router.post("/api/auth/register/send-otp", (req, res) => {
            this.authController.validateOtp(req, res);
        });
        this.router.post("/api/auth/register/resend-otp", (req, res) => {
            this.authController.resendOtp(req, res);
        });
        this.router.post("/api/auth/login", (req, res) => {
            this.authController.login_user(req, res);
        });
    }
}
exports.AuthRouter = AuthRouter;
exports.authRouter = new AuthRouter().router;
