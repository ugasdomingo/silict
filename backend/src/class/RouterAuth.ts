import { Router } from 'express';
import { dataAuthValidation } from '../middleware/dataAuthValidation';
import { adminAuth } from '../middleware/adminAuth';
import {
    register,
    login,
    refresh,
    logout,
    userByID,
    userByEmail,
    allUsers,
    self,
} from '../controllers/usersControllers';

class AuthRouter {
    private readonly router: Router;

    constructor() {
        this.router = Router();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.post('/register', dataAuthValidation, register);
        this.router.post('/login', dataAuthValidation, login);
        this.router.get('/refresh', refresh);
        this.router.get('/logout', logout);
        this.router.get('/self', self);
        this.router.get('/:id', userByID);
        this.router.get('/user/:email', userByEmail);
        this.router.get('/', adminAuth, allUsers);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default AuthRouter;
