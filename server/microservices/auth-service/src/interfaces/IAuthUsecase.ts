import { AuthEntity } from "../entity/auth.entity";

export interface IAuthUsecase {
    register(user:AuthEntity): Promise<void>;
    validateOtp(email:string,otp:number): Promise<boolean>;
    login(email : string , password : string ): Promise<string | null>;
  }
