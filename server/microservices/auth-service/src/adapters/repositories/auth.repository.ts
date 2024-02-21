import { Model } from "mongoose";
import { IAuthSchema } from "../../interfaces/IAuthSchema";
import { IAuthUsecase } from "../../interfaces/IAuthUsecase";
import { AuthEntity } from "../../entity/auth.entity";
import { AuthModel } from "../../models/auth.model";

export class AuthRepository implements IAuthUsecase {
  private readonly AuthModel: Model<IAuthSchema>;

  constructor(authModel: Model<IAuthSchema>) {
    this.AuthModel = authModel;
  }
  
  async register(authCredentials: AuthEntity): Promise<void> {
      try {
          const newUser = new this.AuthModel(authCredentials);
          await newUser.save();
        } catch (error) {
            console.error("Registration failed:", error);
            throw new Error("Registration failed");
        }
    }


    async  validateOtp(email: string, otp: number): Promise<boolean> {
        try {
            const existingData = await AuthModel.findOne({ email: email });
            if (!existingData) {
                throw new Error('User not found');
            }
            if (existingData.otp !== otp || Date.now() - existingData.createdAt.getTime() > 60000) {
                console.log('OTP validation failed due to timeout');
                return false; 
            }
            console.log('OTP validation sucessfully completed');
            return true;
        } catch (error) {
            console.error("OTP validation failed:", error);
            throw new Error("OTP validation failed");
        }
    }
    
    
    login(email: string, password: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
}
