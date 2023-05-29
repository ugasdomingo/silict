//Import tools
import TokenService from '../class/TokenService';

const tokenService = new TokenService(
    process.env.JWT_SECRET as string,
    process.env.JWT_REFRESH as string
);

export const generateToken = (uid: string) => {
    return tokenService.generateToken(uid);
};

export const generateRefreshToken = (uid: string, res: any) => {
    tokenService.generateRefreshToken(uid, res);
};
