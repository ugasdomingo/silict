//Import tools
import { Router } from 'express';
import { adminAuth } from '../middlewares/adminAuth';
import { userAuth } from '../middlewares/userAuth';
import { userOrAdminAuth } from '../middlewares/userOrAdminAuth';
import {
    getAllAffiliation,
    createAffiliation,
    getAffiliationById,
    updateAffiliation,
} from '../controllers/affiliationControllers';

//Define router
const affiliationRouter = Router();

//Routes
affiliationRouter.get('/all', adminAuth, getAllAffiliation);

affiliationRouter.post('/', userAuth, createAffiliation);

affiliationRouter.get('/:id', userOrAdminAuth, getAffiliationById);

affiliationRouter.put('/:id', adminAuth, updateAffiliation);

//Export routes
export default affiliationRouter;
