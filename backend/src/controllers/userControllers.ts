// Import Tools
import { Request, Response } from 'express';
import { UserModel, IUser } from '../models/UserModel';
import { UserHistoryModel, IUserHistory } from '../models/UserHistoryModel';
import { generateRefreshToken, generateToken } from '../utils/tokenManager';
import { getRewardsPoints } from '../helpers/getRewardsPoints';
import jwt from 'jsonwebtoken';

// Register --> Line 13
// Login --> Line 38
// Refresh --> Line 61
// Logout --> Line 85
// Self --> Line 85
// oneUser --> Line 91
// allUsers --> Line 101
const expiresIn = 60 * 60 * 24 * 30; // Expiration Cookie Rol

// Register Controller
export const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
        //Validate unique user
        const userExist: IUser | null = await UserModel.findOne({ email });
        if (userExist)
            return res.status(400).json({ message: 'Usuario ya Existe' });

        //Create new user
        const user: IUser = new UserModel({
            name,
            email,
            password,
            role,
        });
        await user.save();

        //Email Validation soon

        // Create userHistory
        const userHistory: IUserHistory = new UserHistoryModel({
            uid: user.id,
        });
        await userHistory.save();

        //Generate Token & RefreshToken
        const refreshToken = generateRefreshToken(user.id);
        const response = {
            ...generateToken(user.id),
            role: user.role,
            name: user.name,
            rewardsPoints: userHistory.getRewardsPoints(),
            refreshToken,
        };

        return res.status(200).json(response);
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Login Controller
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        //Validate User
        const user: IUser | null = await UserModel.findOne({ email });
        if (!user)
            return res.status(401).json({ message: 'Usuario no existe' });

        //Validate Password
        const validatePassword = await user.comparePassword(password);
        if (!validatePassword)
            return res.status(401).json({ message: 'Credenciales Inválidas' });

        //Generate Token & RefreshToken
        const refreshToken = generateRefreshToken(user.id);

        const response = {
            ...generateToken(user.id),
            role: user.role,
            name: user.name,
            rewardsPoints: getRewardsPoints(user.id),
        };

        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Refresh Controller
export const refresh = async (req: Request, res: Response) => {
    //Payload for req.uid handdle
    interface JwtPayload {
        uid: string;
    }

    try {
        let refreshTokenCookie = req.headers.authorization;
        refreshTokenCookie = refreshTokenCookie?.split(' ')[1];

        if (!refreshTokenCookie)
            throw new Error('Debes hacer login para ver esta página');

        const { uid } = jwt.verify(
            refreshTokenCookie,
            process.env.JWT_REFRESH as string
        ) as JwtPayload;

        const user: IUser | null = await UserModel.findById(uid);

        if (!user) throw new Error('Debes hacer login para ver esta página');

        const refreshToken = generateRefreshToken(user.id);
        const response = {
            ...generateToken(user.id),
            role: user?.role,
            name: user?.name,
            rewardsPoints: getRewardsPoints(user.id),
            refreshToken,
        };

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Logout Controller
export const logout = async (req: Request, res: Response) => {
    res.clearCookie('refreshToken');
    res.status(204).json({ mesage: 'Logout' });
};

// allUsers Controller
export const allUsers = async (req: Request, res: Response) => {
    try {
        const user: IUser[] | null = await UserModel.find().lean();

        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
