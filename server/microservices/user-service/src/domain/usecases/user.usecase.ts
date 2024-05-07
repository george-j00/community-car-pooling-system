import { UserRepository } from "../../adapters/repositories/user.repository";
import { UserEntity } from "../entity/user.entity";
import { IUserSchema } from "../../interfaces/IUserSchema";
import { IUserCase } from "../../interfaces/IUserUsecase";

export class UserUsecase implements IUserCase{

    constructor(private userRepository:UserRepository ){}

    register(user: UserEntity): Promise<void> {
      return this.userRepository.register(user);
    }
    checkUserExistence(email: string): Promise<any> {
      return this.userRepository.checkUserExistence(email);
    }
    login(email: string, password: string): Promise<string | null> {
        return this.userRepository.login(email, password);
    }
    add_car(userId : string ,addCarData: UserEntity): Promise<void> {
      return this.userRepository.add_car(userId, addCarData);
    }
    getAllUsers(): Promise<any> {
      return this.userRepository.getAllUsers();
    }
    banUser(userId : string): Promise<any> {
      return this.userRepository.banUser(userId);
    }
    updateProfile(userId : string , data : any): Promise<any> {
      return this.userRepository.updateProfile(userId , data);
    }
    getUser(userId : string): Promise<any> {
      return this.userRepository.getUser(userId);
    }
    getPassengersData(passengersList:any): Promise<any> {
      return this.userRepository.getPassengersData(passengersList);
    }
  
 

}   