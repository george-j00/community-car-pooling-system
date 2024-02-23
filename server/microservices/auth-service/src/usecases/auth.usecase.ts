import { AuthRepository } from "../adapters/repositories/auth.repository";
import { AuthEntity } from "../entity/auth.entity";
import { JwtService } from "../frameworks/jwt/jwt";
import { RabbitMQService } from "../frameworks/messageBroker/rabbitmq";
import { IAuthUsecase } from "../interfaces/IAuthUsecase";

export class AuthUsecase implements IAuthUsecase {

    constructor(private authRepository: AuthRepository,private rabbitmqService: RabbitMQService, private jwt : JwtService){}

    register(authCredentials: AuthEntity): Promise<void> {
        return this.authRepository.register(authCredentials);
    }
    validateOtp(email:string ,otp: number): Promise<boolean> {
        return this.authRepository.validateOtp(email , otp);
    }
    
    async login(email: string, password: string): Promise<string | null> {
        const credentials = {
          email: email,
          password: password,
        };
        
        const  token  =
          await this.rabbitmqService.publicLoginCredentials(credentials);
        
        // console.log('validationResponse in auth usecase', loginResponse);
        // if (loginResponse !== null ) {
        //   const token = this.jwt.generateToken(email);
        //   console.log("token generated", token);
        //   return token;
        // }

        return token;
      }
    
}