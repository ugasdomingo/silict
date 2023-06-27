//Import tools
import jwt from 'jsonwebtoken';

//Interface to handdle JWT
interface JwtPayload {
    uid: string;
}

//Authenticated user
export const userAuth = (req: any, res: any, next: any) => {
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

        next();
    } catch (error: any) {
        return res.status(401).json({ message: error.message });
    }
};
