//Import tools
import { Response } from 'express';
import jwt from 'jsonwebtoken';

//Generate Real Token - For users to make all theirs operations
//Expires in 15 minutes
export const generateToken = (uid: string) => {
    const expiresIn = 60 * 30;
    try {
        const token = jwt.sign({ uid }, process.env.JWT_SECRET as string, {
            expiresIn,
        });
        return { token, expiresIn };
    } catch (error: any) {
        console.log(error);
    }
};

//Generate Refresh Token - Only to save at Cookies and use to Refresh User Real Token
//Expires in 30 days
export const generateRefreshToken = (uid: string, res: Response) => {
    const expiresIn = 60 * 60 * 24 * 30;

    try {
        const refreshToken = jwt.sign(
            { uid },
            process.env.JWT_REFRESH as string,
            { expiresIn }
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + expiresIn * 1000),
        });
    } catch (error: any) {
        console.log(error);
    }
};