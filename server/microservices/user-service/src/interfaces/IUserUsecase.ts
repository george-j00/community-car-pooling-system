import { UserEntity } from "../domain/entity/user.entity";
import { IUserSchema } from "./IUserSchema";


export interface IUserCase {
  register(user: UserEntity): Promise<void>;
  login(email : string , password : string ): Promise<any>;
}
