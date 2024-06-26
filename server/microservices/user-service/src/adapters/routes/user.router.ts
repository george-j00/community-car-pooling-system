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
    this.router.post("/api/users/add-car",(req: Request, res: Response) => {
        this.userController.add_car(req, res);
      }
    );
    this.router.get("/api/users/getAllUsers",(req: Request, res: Response) => {
        this.userController.getAllUsers(req, res);
      }
    );
    this.router.post("/api/users/banUser",(req: Request, res: Response) => {
        this.userController.banUser(req, res);
      },
    );
    this.router.post("/api/users/user/update-profile",(req: Request, res: Response) => {
        this.userController.updateProfile(req, res);        
      }
    );
    this.router.get("/api/users/getUser/:userId",(req: Request, res: Response) => {
        this.userController.getUser(req, res);        
      }
    );
  }

  async rabbitMq() {
    await this.consumerMessage.userRegConsumer();
    await this.consumerMessage.checkUserExistence();
    await this.consumerMessage.userLoginConsumer();
    await this.consumerMessage.fetchUserConsumer();
    await this.consumerMessage.fetchPassengersData();
  }
}

export const userRouter = new UserRouter().router;
