import { AuthRepository } from "../../adapters/repositories/auth.repository";
import { AuthEntity } from "../entity/auth.entity";
import { JwtService } from "../../frameworks/jwt/jwt";
import { IAuthSchema } from "../../interfaces/IAuthSchema";
import { IAuthUsecase } from "../../interfaces/IAuthUsecase";
import { RabbitMQService } from "../../frameworks/messageBroker/rabbitmq";

export class AuthUsecase implements IAuthUsecase {

    constructor(private authRepository: AuthRepository,private rabbitmqService: RabbitMQService, private jwt : JwtService){}

    register(authCredentials: AuthEntity): Promise<void> {
        return this.authRepository.register(authCredentials);
    }
    validateOtp(email:string ,otp: number): Promise<IAuthSchema> {
        return this.authRepository.validateOtp(email , otp);
    }
      
    // async login(email: string, password: string): Promise<string | null> {
    //     const credentials = {
    //       email: email,
    //       password: password,
    //     }; 
         
    //     const  token  = await this.rabbitmqService.publicLoginCredentials(credentials);
    //     console.log('generated token',token);

    //     return token;
    //   } 
    async login(email: string, password: string): Promise<string> {
      const userLogin = {
          email: email,
          password: password
      };
  
      console.log(userLogin);
  
      const response: any = await this.rabbitmqService.publishLoginData(userLogin);
  
      if (response === null) {
          console.log(response, "response is null");
          throw new Error("Response is null"); // Throw an error or return a default value here
      } else {
          console.log(response, "the data");
          const data = JSON.parse(response);
          const userData: any = {
              id: data._id,
              username: data.username,
              email: data.email
          };
          console.log(userData);
          const token = this.jwt.generateToken(userData);
          return token;
      }
  }
  
     
}