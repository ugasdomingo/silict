import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth';
import fs from 'fs-extra';
import fileUpload from 'express-fileupload';
import {
    createFormation,
    deleteFormation,
    getAllFormation,
    getFormation,
    updateFormation,
} from '../controllers/formationControllers';

class FormationRouter {
    private readonly router: Router;

    constructor() {
        this.router = Router();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.get('/all', getAllFormation);
        this.router.post(
            '/',
            fileUpload({
                useTempFiles: true,
                tempFileDir: './uploads',
            }),
            adminAuth,
            createFormation
        );
        this.router.get('/:id', getFormation);
        this.router.delete('/:id', adminAuth, deleteFormation);
        this.router.put('/:id', adminAuth, updateFormation);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default FormationRouter;
