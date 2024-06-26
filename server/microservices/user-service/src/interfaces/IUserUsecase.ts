import { UserEntity } from "../domain/entity/user.entity";
import { IUserSchema } from "./IUserSchema";


export interface IUserCase {
  register(user: UserEntity): Promise<void>;
  login(email : string , password : string ): Promise<any>;
  checkUserExistence(email : string): Promise<any>;
  getAllUsers(): Promise<any>;
  banUser(userId : string): Promise<any>;
  getUser(userId : string): Promise<any>;
  getPassengersData(passengersList:any): Promise<any>;
}
