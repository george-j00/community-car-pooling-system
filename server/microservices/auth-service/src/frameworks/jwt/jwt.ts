import jwt from 'jsonwebtoken';

export class JwtService {
  private readonly secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }
  
  generateToken(email: string): string {
    return jwt.sign({email}, this.secretKey, { expiresIn: '15m' });
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
