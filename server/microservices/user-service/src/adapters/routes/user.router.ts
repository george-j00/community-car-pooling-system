import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../repositories/user.repository";
import { UserModel } from "../../models/user.model";
import { UserUsecase } from "../../domain/usecases/user.usecase";
import { rabbitmq } from "../../frameworks/messageBroker/rabbitmq";
import { JwtService } from "../../frameworks/jwt/jwt";


export class UserRouter {
  router = Router();
  secret_key = "secret_key";
  jwt = new JwtService(this.secret_key)
  
  userRepository = new UserRepository(UserModel, this.jwt);
  userUsecase = new UserUsecase(this.userRepository);
  consumerMessage = new rabbitmq(this.userUsecase);
  userController = new UserController(this.userUsecase);
    
  constructor() {
    this.router.post("/api/user/add-car",(req: Request, res: Response) => {
        this.userController.add_car(req, res);
      }
    );
  }

  async rabbitMq() {
    await this.consumerMessage.userRegConsumer();
    await this.consumerMessage.userLoginConsumer();
  }
}

export const userRouter = new UserRouter().router;
