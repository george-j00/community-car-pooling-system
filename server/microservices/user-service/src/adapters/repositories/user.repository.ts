import { Model } from "mongoose";
import { IUserSchema } from "../../interfaces/IUserSchema";
import { IUserCase } from "../../interfaces/IUserUsecase";
import { UserEntity } from "../../entity/user.entity";


export class UserRepository implements IUserCase {
  private readonly UserModel: Model<IUserSchema>;

  constructor(UserModel: Model<IUserSchema>) {
    this.UserModel = UserModel;
  }

  async register(user: UserEntity): Promise<void> {
    try {
      const newUser = new this.UserModel(user);
        console.log('this is newuser from rabbitmq ',newUser);
      await newUser.save();
      console.log('user added successfully');
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed");
    }
  }

  async login(email: string, password: string): Promise<boolean | null> {
    try {
      const user = await this.UserModel.findOne({ email: email }).exec();

      if (user && user.password === password) {
        console.log('login successful');
        return true;
      } 
      else{
        console.log('login failed'); 
        return null; 
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed");
    }
  }

}
