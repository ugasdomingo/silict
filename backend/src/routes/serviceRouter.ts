//Import tools
import { Router } from 'express';
import { adminAuth } from '../middlewares/adminAuth';
import fileUpload from 'express-fileupload';
import {
    getAllService,
    createService,
    getServiceById,
    updateService,
    deleteService,
    getAllServiceByCategory,
} from '../controllers/serviceControllers';

//Define router
const serviceRouter = Router();

//Routes
serviceRouter.get('/all', getAllService);

serviceRouter.get('/all/:category', getAllServiceByCategory);

serviceRouter.post(
    '/',
    adminAuth,
    //getFiles,
    fileUpload({ useTempFiles: true, tempFileDir: './uploads/' }),

    createService
);

serviceRouter.get('/:id', getServiceById);

serviceRouter.put('/:id', adminAuth, updateService);

serviceRouter.delete('/:id', adminAuth, deleteService);

//Export routes
export default serviceRouter;
