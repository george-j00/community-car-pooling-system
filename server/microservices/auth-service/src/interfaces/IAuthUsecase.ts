import { AuthEntity } from "../entity/auth.entity";

export interface IAuthUsecase {
    register(user:AuthEntity): Promise<void>;
    login(email : string , password : string ): Promise<string | null>;
  }
