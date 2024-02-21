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
const user_usecase_1 = require("../../usecases/user.usecase");
const rabbitmq_1 = require("../../frameworks/messageBroker/rabbitmq");
class UserRouter {
    constructor() {
        // this.router.post("/api/user/add-address",(req: Request, res: Response) => {
        //     this.userController.add_address(req, res);
        //   }
        // );
        this.router = (0, express_1.Router)();
        this.userRepository = new user_repository_1.UserRepository(user_model_1.UserModel);
        this.userUsecase = new user_usecase_1.UserUsecase(this.userRepository);
        this.consumerMessage = new rabbitmq_1.AuthConsumers(this.userUsecase);
        this.userController = new user_controller_1.UserController(this.userUsecase);
        // this.router.post("/api/user/delete-address",(req: Request, res: Response) => {
        //     this.userController.delete_address(req, res);
        //   }
        // );
    }
    rabbitMq() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consumerMessage.consumeMessages();
            yield this.consumerMessage.loginCommunications();
        });
    }
}
exports.UserRouter = UserRouter;
exports.userRouter = new UserRouter().router;
