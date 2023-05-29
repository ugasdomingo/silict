import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth';
import fs from 'fs-extra';
import fileUpload from 'express-fileupload';
import {
    createScholarship,
    deleteScholarship,
    getAllScholarship,
    getScholarship,
    updateScholarship,
} from '../controllers/scholarshipControllers';

class ScholarshipRouter {
    private readonly router: Router;

    constructor() {
        this.router = Router();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.get('/all', getAllScholarship);
        this.router.post(
            '/',
            fileUpload({
                useTempFiles: true,
                tempFileDir: './uploads',
            }),
            adminAuth,
            createScholarship
        );
        this.router.get('/:id', getScholarship);
        this.router.delete('/:id', adminAuth, deleteScholarship);
        this.router.put('/:id', adminAuth, updateScholarship);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default ScholarshipRouter;
