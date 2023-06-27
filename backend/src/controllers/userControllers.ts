// Import Tools
import { UserModel } from '../models/UserModel';
import { generateRefreshToken, generateToken } from '../utils/tokenManager';
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
export const register = async (req: any, res: any) => {
    const { name, email, password } = req.body;

    try {
        //Validate unique user
        const uniqueEmail = await UserModel.findOne({ email });
        if (uniqueEmail)
            return res.status(400).json({ message: 'Usuario ya Existe' });

        //Create new user
        const user = new UserModel({
            name,
            email,
            password,
        });
        await user.save();

        //Email Validation

        //Generate Token & RefreshToken
        const response = {
            ...generateToken(user.id),
            role: user.role,
            name: user.name,
        };

        generateRefreshToken(user.id, res);

        return res.status(200).json(response);
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Login Controller
export const login = async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
        //Validate User
        const user = await UserModel.findOne({ email });
        if (!user)
            return res.status(401).json({ message: 'Credenciales Inválidas' });

        //Validate Password
        const validatePassword = await user.comparePassword(password);
        if (!validatePassword)
            return res.status(401).json({ message: 'Credenciales Inválidas' });

        //Generate Token & RefreshToken
        const response = {
            ...generateToken(user.id),
            role: user.role,
            name: user.name,
        };

        generateRefreshToken(user.id, res);

        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Refresh Controller
export const refresh = async (req: any, res: any) => {
    //Payload for req.uid handdle
    interface JwtPayload {
        uid: string;
    }

    try {
        let refreshTokenCookie = req.headers.cookie;
        refreshTokenCookie = refreshTokenCookie?.split('=')[1];

        if (!refreshTokenCookie)
            throw new Error('Debes hacer login para ver esta página');

        const { uid } = jwt.verify(
            refreshTokenCookie,
            process.env.JWT_REFRESH as string
        ) as JwtPayload;

        const user = await UserModel.findById(uid);

        const response = {
            ...generateToken(user?.id),
            role: user?.role,
        };

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Logout Controller
export const logout = async (req: any, res: any) => {
    res.clearCookie('refreshToken');
    res.status(204).json({ mesage: 'Logout' });
};

// allUsers Controller
export const allUsers = async (req: any, res: any) => {
    try {
        const user = await UserModel.find().lean();
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
