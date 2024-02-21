import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../repositories/user.repository";
import { UserModel } from "../../models/user.model";
import { UserUsecase } from "../../usecases/user.usecase";
import { AuthConsumers } from "../../frameworks/messageBroker/rabbitmq";


export class UserRouter {
  router = Router();

  userRepository = new UserRepository(UserModel);
  userUsecase = new UserUsecase(this.userRepository);
  consumerMessage = new AuthConsumers(this.userUsecase);
  userController = new UserController(this.userUsecase);
    
  constructor() {
    // this.router.post("/api/user/add-address",(req: Request, res: Response) => {
    //     this.userController.add_address(req, res);
    //   }
    // );

    // this.router.post("/api/user/delete-address",(req: Request, res: Response) => {
    //     this.userController.delete_address(req, res);
    //   }
    // );
  }

  async rabbitMq() {
    await this.consumerMessage.consumeMessages()
    await this.consumerMessage.loginCommunications();
  }
}

export const userRouter = new UserRouter().router;
