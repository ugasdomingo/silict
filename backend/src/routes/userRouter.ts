//Import tools
import { Router } from 'express';
import { dataAuthValidation } from '../middlewares/dataAuthValidation';
import { adminAuth } from '../middlewares/adminAuth';
import {
    register,
    login,
    refresh,
    logout,
    allUsers,
} from '../controllers/userControllers';

//Define router
const authRouter = Router();

//Routes
authRouter.post('/register', dataAuthValidation, register);

authRouter.post('/login', dataAuthValidation, login);

authRouter.get('/refresh', refresh);

authRouter.get('/logout', logout);

authRouter.get('/', adminAuth, allUsers);

//Export routes
export default authRouter;
