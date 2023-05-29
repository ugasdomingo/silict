//Import tools
import jwt from 'jsonwebtoken';

class TokenService {
  private readonly jwtSecret: string;
  private readonly jwtRefreshSecret: string;
  
  constructor(jwtSecret: string, jwtRefreshSecret: string) {
    this.jwtSecret = jwtSecret;
    this.jwtRefreshSecret = jwtRefreshSecret;
  }

  public generateToken(uid: string): { token: string, expiresIn: number } {
    const expiresIn = 60 * 30;
    try {
      const token = jwt.sign({ uid }, this.jwtSecret, { expiresIn });
      return { token, expiresIn };
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  public generateRefreshToken(uid: string, res: any): void {
    const expiresIn = 60 * 60 * 24 * 30;
  
    try {
      const refreshToken = jwt.sign({ uid }, this.jwtRefreshSecret, { expiresIn });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: new Date(Date.now() + expiresIn * 1000),
      });
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
}

export default TokenService;