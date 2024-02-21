import { UserEntity } from "../entity/user.entity";


export interface IUserCase {
  register(user: UserEntity): Promise<void>;
  login(email : string , password : string ): Promise<boolean | null>;
}
