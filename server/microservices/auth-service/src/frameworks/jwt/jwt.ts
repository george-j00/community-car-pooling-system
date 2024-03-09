import jwt from 'jsonwebtoken';

export class JwtService {
  private readonly secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }
  
  generateToken(userData: any): string {
    return jwt.sign({userData}, this.secretKey, { expiresIn: '15m' });
  }
  
  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      console.error('JWT verification failed:', error);
      return null;
    }
  }
}
