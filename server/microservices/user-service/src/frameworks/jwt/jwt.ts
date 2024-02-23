import jwt from 'jsonwebtoken';

export class JwtService {
  private readonly secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }
  
  generateToken(email: string): string {
    return jwt.sign({email}, this.secretKey, { expiresIn: '15m' });
  }
  
}
