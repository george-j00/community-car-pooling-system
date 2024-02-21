import { Request, Response } from "express";
import { UserUsecase } from "../../usecases/user.usecase";

export class UserController {
  
  private readonly userUsecase: UserUsecase;
  constructor(userUsecase: UserUsecase) {
    this.userUsecase = userUsecase;
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
