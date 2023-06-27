//Import tools
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel';

//Interface to handdle JWT
interface JwtPayload {
    uid: string;
}

export const userOrAdminAuth = async (req: any, res: any, next: any) => {
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

        //Is Admin or an user?
        const user = await UserModel.findOne({ _id: uid });
        console.log(user?.role);
        if (user?.role == 'Admin' || 'user') {
            next();
        } else {
            throw new Error('No tienes autorización para hacer esta operación');
        }
    } catch (error: any) {
        return res.status(401).json({ message: error.message });
    }
};
