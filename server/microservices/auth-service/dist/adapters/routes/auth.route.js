"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_usecase_1 = require("../../usecases/auth.usecase");
const auth_repository_1 = require("../repositories/auth.repository");
const auth_model_1 = require("../../models/auth.model");
class AuthRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authRepository = new auth_repository_1.AuthRepository(auth_model_1.AuthModel);
        this.authUsecase = new auth_usecase_1.AuthUsecase(this.authRepository);
        this.authController = new auth_controller_1.AuthController(this.authUsecase);
        this.router.post("/api/auth/register", (req, res) => {
            this.authController.register_user(req, res);
        });
        this.router.post("/api/auth/register/send-otp", (req, res) => {
            this.authController.validateOtp(req, res);
        });
    }
}
exports.AuthRouter = AuthRouter;
exports.authRouter = new AuthRouter().router;
