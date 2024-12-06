import { Router } from 'express';
import {createNewPromoCode, getDiscount} from '../controllers/promoCodeController';

const router = Router();

router.post('/createPromoCode', createNewPromoCode);
router.get('/getPromoCode/:code/:total', getDiscount);

export default router;