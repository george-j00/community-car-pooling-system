import { Model } from "mongoose";
import { IAuthSchema } from "../../interfaces/IAuthSchema";
import { IAuthUsecase } from "../../interfaces/IAuthUsecase";
import { AuthEntity } from "../../entity/auth.entity";

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
    
    login(email: string, password: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
}
