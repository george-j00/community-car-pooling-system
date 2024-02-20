import { AuthRepository } from "../adapters/repositories/auth.repository";
import { AuthEntity } from "../entity/auth.entity";
import { IAuthUsecase } from "../interfaces/IAuthUsecase";

export class AuthUsecase implements IAuthUsecase {

    constructor(private authRepository: AuthRepository){}

    register(authCredentials: AuthEntity): Promise<void> {
        return this.authRepository.register(authCredentials);
    }
    login(email: string, password: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    
}