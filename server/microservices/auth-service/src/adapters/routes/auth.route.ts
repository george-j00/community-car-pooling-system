import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthUsecase } from "../../domain/usecases/auth.usecase";
import { AuthRepository } from "../repositories/auth.repository";
import { AuthModel } from "../../models/auth.model";
import { RabbitMQService } from "../../frameworks/messageBroker/rabbitmq";
import { JwtService } from "../../frameworks/jwt/jwt";

export class AuthRouter {

  secret_key = "secret_key";
  jwt = new JwtService(this.secret_key)
  router = Router();
  rabbitMq = new RabbitMQService();
  authRepository = new AuthRepository(AuthModel,this.rabbitMq);
  authUsecase = new AuthUsecase(this.authRepository ,this.rabbitMq , this.jwt);
  authController = new AuthController(this.authUsecase,this.rabbitMq);

  constructor() {
    this.router.post("/api/auth/register", (req: Request, res: Response) => {
      this.authController.register_user(req, res);
    });
    this.router.post("/api/auth/register/send-otp", (req: Request, res: Response) => {
      this.authController.validateOtp(req, res);
    });
    this.router.post("/api/auth/register/resend-otp", (req: Request, res: Response) => {
      this.authController.resendOtp(req, res);
    });
    this.router.post("/api/auth/login", (req: Request, res: Response) => {
      this.authController.login_user(req, res);
    });
  }
}

export const authRouter = new AuthRouter().router;
