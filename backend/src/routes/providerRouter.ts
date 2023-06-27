//Import tools
import { Router } from 'express';
import { adminAuth } from '../middlewares/adminAuth';
import {
    getAllProvider,
    createProvider,
    getProviderById,
    updateProvider,
    deleteProvider,
} from '../controllers/providerControllers';

//Define router
const providerRouter = Router();

//Routes
providerRouter.get('/all', getAllProvider);

providerRouter.post('/', adminAuth, createProvider);

providerRouter.get('/:id', getProviderById);

providerRouter.put('/:id', adminAuth, updateProvider);

providerRouter.delete('/:id', adminAuth, deleteProvider);

//Export routes
export default providerRouter;
