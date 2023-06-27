//Import tools
import { Router } from 'express';
import {
    cancelOrder,
    captureOrder,
    createOrder,
} from '../controllers/paymentControllers';

const router = Router();

router.get('/create-order', createOrder);

router.get('/capture-order', captureOrder);

router.get('/cancel-order', cancelOrder);

export default router;
