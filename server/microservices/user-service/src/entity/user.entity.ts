import { ICarDetails } from "../interfaces/ICarDetails";

export class UserEntity {

    public readonly username: string;
    public readonly email: string;
    public readonly password: string;
    public readonly car:ICarDetails ;
    
    constructor(username: string, email: string, password: string, car:ICarDetails ) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.car = car;
    }
  }
  