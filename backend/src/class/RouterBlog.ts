import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth';
import fs from 'fs-extra';
import fileUpload from 'express-fileupload';
import {
    createPost,
    deletePost,
    getAllPost,
    getPost,
    updatePost,
} from '../controllers/blogControllers';

class BlogRouter {
    private readonly router: Router;

    constructor() {
        this.router = Router();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.get('/all', getAllPost);

        this.router.post(
            '/',
            fileUpload({
                useTempFiles: true,
                tempFileDir: './uploads',
            }),
            adminAuth,
            createPost
        );

        this.router.get('/:id', getPost);

        this.router.delete('/:id', adminAuth, deletePost);

        this.router.put('/:id', adminAuth, updatePost);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default BlogRouter;
