import { UserRepository } from "../adapters/repositories/user.repository";
import { UserEntity } from "../entity/user.entity";
import { IUserCase } from "../interfaces/IUserUsecase";

export class UserUsecase implements IUserCase{

    constructor(private userRepository:UserRepository ){}

    register(user: UserEntity): Promise<void> {
      return this.userRepository.register(user);
    }
    login(email: string, password: string): Promise<boolean | null> {
        return this.userRepository.login(email, password);
    }

}