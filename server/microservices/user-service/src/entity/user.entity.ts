export class UserEntity {

    public readonly username: string;
    public readonly email: string;
    public readonly password: string;
    
    constructor(username: string, email: string, password: string ) {
      this.username = username;
      this.email = email;
      this.password = password;
    }
  }
  