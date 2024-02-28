import { IUserSchema } from "../../interfaces/IUserSchema";
import { Model } from "mongoose";
import { IUserCase } from "../../interfaces/IUserUsecase";
import { UserEntity } from "../../domain/entity/user.entity";
import bcrypt from "bcryptjs";
import { JwtService } from "../../frameworks/jwt/jwt";

export class UserRepository implements IUserCase {
  private readonly UserModel: Model<IUserSchema>;
  private readonly Jwt: JwtService;

  constructor(UserModel: Model<IUserSchema>, Jwt: JwtService) {
    this.UserModel = UserModel;
    this.Jwt = Jwt;
  }

  async register(user: UserEntity): Promise<void> {
    try {
      
      const newUser = new this.UserModel(user, { new: true });
      console.log("this is newuser from rabbitmq ", newUser);
       await newUser.save();
      console.log("user added successfully");
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed");
    }
  }
  async checkUserExistence(email: string): Promise<any> {
    try {

      const existingData = await this.UserModel.findOne({ email: email });
     if (existingData) {
       console.log("Email already exists");
      return existingData 
     }
     return null;
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed");
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const user = await this.UserModel.findOne({ email: email }).exec();

      if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
              console.log('Login successful');
              return user;
          } else {
              console.log('Password mismatch');
              return false;
          }
      } else {
          console.log('User not found');
          return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed");
    }
  }

  async add_car(userId: string, addCarDetails: UserEntity): Promise<void> {
    try {
      const addedCar = this.UserModel.findByIdAndUpdate(userId, addCarDetails);
      console.log("add car details ", addedCar);
      // await newUser.save();
      console.log("user added successfully");
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed");
    }
  }
  async getAllUsers(): Promise<any> {
    try {
      const allUsers =await this.UserModel.find({},{password:0});
      console.log("get all user details ", allUsers);
      return allUsers
    } catch (error) {
      console.error("Fetching all users failed:", error);
      throw new Error("Error while fetching all users");
    }
  }

  async banUser(userId : string) : Promise<any> {
    try {
      const banUser : IUserSchema | null = await this.UserModel.findById(userId);
      if (banUser) {
        banUser.status = banUser.status === "active" ? "banned" : "active";
      }
     const newUser =  await banUser?.save()
      console.log('User ban/unblock success',newUser);
      return newUser?.status
    } catch (error) {
      console.error("Error while banning user:", error);
      throw new Error("Error while banning user");
    }
  }
} 