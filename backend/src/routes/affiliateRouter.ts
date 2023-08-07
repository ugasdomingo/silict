//Import tools
import { Router } from 'express';
import {
    statusAffiliate,
    createAffiliateHistory,
} from '../controllers/affiliateControllers';
import { userAuth } from '../middlewares/userAuth';

const router = Router();

router.post('/status', userAuth, statusAffiliate);

router.post('/history', userAuth, createAffiliateHistory);

export default router;
