//Import tools
import { Router } from 'express';
import { adminAuth } from '../middlewares/adminAuth';
import fs from 'fs-extra';
import fileUpload from 'express-fileupload';
import {
    getAllCourse,
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse,
    getAllCourseByCategory,
} from '../controllers/courseControllers';

//Define router
const courseRouter = Router();

//Routes
courseRouter.get('/all', getAllCourse);

courseRouter.get('/all/:category', getAllCourseByCategory);

courseRouter.post(
    '/',
    adminAuth,
    fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads',
    }),
    createCourse
);

courseRouter.get('/:id', getCourse);

courseRouter.put('/:id', adminAuth, updateCourse);

courseRouter.delete('/:id', adminAuth, deleteCourse);

//Export routes
export default courseRouter;
