import { Model } from "mongoose";
import { IAuthSchema } from "../../interfaces/IAuthSchema";
import { IAuthUsecase } from "../../interfaces/IAuthUsecase";
import { AuthEntity } from "../../domain/entity/auth.entity";
import { AuthModel } from "../../models/auth.model";
import { RabbitMQService } from "../../frameworks/messageBroker/rabbitmq";

export class AuthRepository implements IAuthUsecase {
  private readonly AuthModel: Model<IAuthSchema>;
  private readonly RabbitMq: RabbitMQService;

  constructor(authModel: Model<IAuthSchema>, rabbitMq: RabbitMQService) {
    this.AuthModel = authModel;
    this.RabbitMq = rabbitMq;
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

  async validateOtp(email: string, otp: number): Promise<any > {
    try {
      const existingData = await AuthModel.findOne({ email: email });
      if (!existingData) {
        throw new Error("User not found");
      } 
      if (
        existingData.otp !== otp ||
        Date.now() - existingData.createdAt.getTime() > 60000
      ) {
        console.log("OTP validation failed due to timeout");
      }
      console.log("OTP validation sucessfully completed");

     const userData = await this.RabbitMq.userRegPublisher(existingData)

      console.log('final user data ',userData);
      return userData
      
    } catch (error) {
      console.error("OTP validation failed:", error);
      // return null;
      throw new Error("OTP validation failed");
    }
  }

  login(email: string, password: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
 