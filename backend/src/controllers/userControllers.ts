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
    const { name, email, password, role } = req.body;

    try {
        //Validate unique user
        const uniqueEmail = await UserModel.findOne({ email });
        if (uniqueEmail)
            return res.status(400).json({ message: 'Usuario ya Existe' });

        //Set date
        const date = new Date(Date.now()).toLocaleDateString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        //Create new user
        const user = new UserModel({
            name,
            email,
            password,
            date,
            role,
        });
        await user.save();

        //Email Validation

        //Generate Token & RefreshToken
        const refreshToken = generateRefreshToken(user.id);
        const response = {
            ...generateToken(user.id),
            role: user.role,
            name: user.name,
            refreshToken,
        };

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
        const refreshToken = generateRefreshToken(user.id);

        const response = {
            ...generateToken(user.id),
            role: user.role,
            name: user.name,
            refreshToken,
        };

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
        let refreshTokenCookie = req.headers.authorization;
        refreshTokenCookie = refreshTokenCookie?.split(' ')[1];

        if (!refreshTokenCookie)
            throw new Error('Debes hacer login para ver esta página');

        const { uid } = jwt.verify(
            refreshTokenCookie,
            process.env.JWT_REFRESH as string
        ) as JwtPayload;

        const user = await UserModel.findById(uid);

        const refreshToken = generateRefreshToken(user?.id);
        const response = {
            ...generateToken(user?.id),
            role: user?.role,
            name: user?.name,
            refreshToken,
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
