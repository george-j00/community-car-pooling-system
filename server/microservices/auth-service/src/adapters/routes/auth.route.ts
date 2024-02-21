import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthUsecase } from "../../usecases/auth.usecase";
import { AuthRepository } from "../repositories/auth.repository";
import { AuthModel } from "../../models/auth.model";

export class AuthRouter {
  router = Router();

  authRepository = new AuthRepository(AuthModel);
  authUsecase = new AuthUsecase(this.authRepository);
  authController = new AuthController(this.authUsecase);

  constructor() {
    this.router.post("/api/auth/register", (req: Request, res: Response) => {
      this.authController.register_user(req, res);
    });
    this.router.post("/api/auth/register/send-otp", (req: Request, res: Response) => {
      this.authController.validateOtp(req, res);
    });
  }
}

export const authRouter = new AuthRouter().router;
