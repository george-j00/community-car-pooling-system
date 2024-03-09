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
exports.userRouter = exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_repository_1 = require("../repositories/user.repository");
const user_model_1 = require("../../models/user.model");
const user_usecase_1 = require("../../domain/usecases/user.usecase");
const rabbitmq_1 = require("../../frameworks/messageBroker/rabbitmq");
const jwt_1 = require("../../frameworks/jwt/jwt");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.secret_key = "secret_key";
        this.jwt = new jwt_1.JwtService(this.secret_key);
        this.userRepository = new user_repository_1.UserRepository(user_model_1.UserModel, this.jwt);
        this.userUsecase = new user_usecase_1.UserUsecase(this.userRepository);
        this.consumerMessage = new rabbitmq_1.rabbitmq(this.userUsecase);
        this.userController = new user_controller_1.UserController(this.userUsecase);
        this.router.post("/api/users/add-car", (req, res) => {
            this.userController.add_car(req, res);
        });
        this.router.get("/api/users/getAllUsers", (req, res) => {
            this.userController.getAllUsers(req, res);
        });
        this.router.post("/api/users/banUser", (req, res) => {
            this.userController.banUser(req, res);
        });
    }
    rabbitMq() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consumerMessage.userRegConsumer();
            yield this.consumerMessage.checkUserExistence();
            yield this.consumerMessage.userLoginConsumer();
        });
    }
}
exports.UserRouter = UserRouter;
exports.userRouter = new UserRouter().router;
