//Import tools
import { Router } from 'express';
import { adminAuth } from '../middlewares/adminAuth';
import {
    getAllService,
    createService,
    getServiceById,
    updateService,
    deleteService,
} from '../controllers/serviceControllers';

//Define router
const serviceRouter = Router();

//Routes
serviceRouter.get('/all', getAllService);

serviceRouter.post('/', adminAuth, createService);

serviceRouter.get('/:id', getServiceById);

serviceRouter.put('/:id', adminAuth, updateService);

serviceRouter.delete('/:id', adminAuth, deleteService);

//Export routes
export default serviceRouter;
