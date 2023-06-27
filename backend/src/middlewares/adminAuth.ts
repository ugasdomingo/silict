//Import tools
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel';

//Interface for JWT handdle
interface JwtPayload {
    uid: string;
}

export const adminAuth = async (req: any, res: any, next: any) => {
    try {
        //User have a token?
        let token = req.headers.authorization;
        if (!token) throw new Error('Debes hacer login para ver esta página');

        //Validate tokens
        token = token.split(' ')[1];
        const { uid } = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;
        req.uid = uid;

        //Is Admin?
        const Admin = await UserModel.findOne({ _id: uid }); //Get user byId
        if (Admin?.role !== 'Admin')
            throw new Error('No tienes autorización para hacer esta operación');
        next();
    } catch (error: any) {
        return res.status(401).json({ message: error.message });
    }
};
