import jwt from 'jsonwebtoken';

export class JwtService {
  private readonly secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }
  
  generateToken(userName: string , email: string): string {
    const payload ={
      userName: userName,
      email: email
    }
    return jwt.sign(payload, this.secretKey, { expiresIn: '15m' });
  }
  
}
