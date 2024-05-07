import { Request, Response } from "express";
import { UserUsecase } from "../../domain/usecases/user.usecase";

export class UserController {
  private readonly userUsecase: UserUsecase;
  constructor(userUsecase: UserUsecase) {
    this.userUsecase = userUsecase;
  }

  async add_car(req: Request, res: Response) {
    try {
      const { carData, userId } = req.body;
      await this.userUsecase.add_car(userId, carData);
      res.status(200).send("Address added successfully");
    } catch (error) {
      res.status(500).send("Error while adding address");
      console.log("Error while adding => ", error);
    }
  }
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userUsecase.getAllUsers();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).send("Error while adding address");
      console.log("Error while adding => ", error);
    }
  }
  async banUser(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      console.log(userId);

      const response = await this.userUsecase.banUser(userId);
      if (response) {
        res.status(200).json({updated: response});
      }
    } catch (error) {
      res.status(500).send("Error while adding address");
      console.log("Error while adding => ", error);
    }
  }
  async updateProfile(req: Request, res: Response) {
    try {
      const { userId , data } = req.body;
      console.log(userId, data);
      const response = await this.userUsecase.updateProfile(userId,data);
      if (response) {
        res.status(200).json({updatedUser: response});
      }
    } catch (error) {
      res.status(500).send("Error while adding address");
      console.log("Error while adding => ", error);
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const response = await this.userUsecase.getUser(userId);
      if (response) {
        res.status(200).json({updatedUser: response});
      }
    } catch (error) {
      res.status(500).send("Error while adding address");
      console.log("Error while adding => ", error);
    }
  }


}
