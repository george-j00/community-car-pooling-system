import { Model } from "mongoose";
import { IUserSchema } from "../../interfaces/IUserSchema";
import { IUserCase } from "../../interfaces/IUserUsecase";
import { UserEntity } from "../../entity/user.entity";
import bcrypt from "bcryptjs";

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

      console.log('this is user ',user?.password , password);
      const storedHash  = user?.password;
       if (user && storedHash) {
        const isMatch = await bcrypt.compare(password, storedHash);
        console.log('login successful');
        console.log('is matchhhhh',isMatch);
        return isMatch ? true : false;
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
