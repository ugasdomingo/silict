//Import tools
import { Router } from 'express';
import { adminAuth } from '../middlewares/adminAuth';
import { userAuth } from '../middlewares/userAuth';
import { userOrAdminAuth } from '../middlewares/userOrAdminAuth';
import {
    getAllSave,
    createSave,
    getSaveById,
    updateSave,
    deleteSave,
} from '../controllers/saveControllers';

//Define router
const saveRouter = Router();

//Routes
saveRouter.get('/all', adminAuth, getAllSave);

saveRouter.post('/', userAuth, createSave);

saveRouter.get('/:id', userOrAdminAuth, getSaveById);

saveRouter.put('/:id', adminAuth, updateSave);

saveRouter.delete('/:id', adminAuth, deleteSave);

//Export routes
export default saveRouter;
