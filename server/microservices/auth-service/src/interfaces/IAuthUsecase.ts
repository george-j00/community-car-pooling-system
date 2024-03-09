import { AuthEntity } from "../domain/entity/auth.entity";
import { IAuthSchema } from "./IAuthSchema";

export interface IAuthUsecase {
    register(user:AuthEntity): Promise<void>;
    validateOtp(email:string,otp:number): Promise<IAuthSchema>;
    login(email : string , password : string ): Promise<any>;
  }
