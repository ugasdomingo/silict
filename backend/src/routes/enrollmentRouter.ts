//Import tools
import { Router } from 'express';
import { adminAuth } from '../middlewares/adminAuth';
import { userAuth } from '../middlewares/userAuth';
import { userOrAdminAuth } from '../middlewares/userOrAdminAuth';
import {
    getAllEnrollment,
    createEnrollment,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment,
} from '../controllers/enrollmentControllers';

//Define router
const enrollmentRouter = Router();

//Routes
enrollmentRouter.get('/all', adminAuth, getAllEnrollment);

enrollmentRouter.post('/', userAuth, createEnrollment);

enrollmentRouter.get('/:id', userOrAdminAuth, getEnrollmentById);

enrollmentRouter.put('/:id', adminAuth, updateEnrollment);

enrollmentRouter.delete('/:id', adminAuth, deleteEnrollment);

//Export routes
export default enrollmentRouter;
