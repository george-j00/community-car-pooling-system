import { Request, Response } from "express";
import { UserUsecase } from "../../domain/usecases/user.usecase";

export class UserController {
  private readonly userUsecase: UserUsecase;
  constructor(userUsecase: UserUsecase) {
    this.userUsecase = userUsecase;
  }

  async add_car(req: Request, res: Response) {
    try {
      const { userId, addCarDetails } = req.body;
      await this.userUsecase.add_car(userId, addCarDetails);
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

  //   async add_address(req: Request, res: Response) {
  //     try {
  //         const {address , userId}  = req.body;
  //         await this.userUsecase.addAddress(userId,address);
  //         res.status(200).send('Address added successfully');
  //     } catch (error) {
  //         res.status(500).send('Error while adding address');
  //         console.log('Error while adding => ', error);
  //     }
  // }

  //   async delete_address(req: Request, res: Response) {
  //     try {
  //       const { userId } = req.body;
  //       await this.userUsecase.deleteAddress(userId);
  //       res.status(200).send('Address deleted successfully');
  //     } catch (error) {
  //       res.send("error");
  //       console.log("Error while deleting => ", error);
  //     }
  //   }
}
