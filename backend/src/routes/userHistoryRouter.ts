//Import tools
import { Router } from 'express';
import { adminAuth } from '../middlewares/adminAuth';
import { userAuth } from '../middlewares/userAuth';
import {
    getAllUserHistory,
    getUserHistory,
    createSaveGoals,
} from '../controllers/userHistoryControllers';

//Define router
const userHistoryRouter = Router();

//Routes
userHistoryRouter.get('/all', adminAuth, getAllUserHistory);

userHistoryRouter.get('/', userAuth, getUserHistory);

userHistoryRouter.post('/goals', userAuth, createSaveGoals);

//Export routes
export default userHistoryRouter;
