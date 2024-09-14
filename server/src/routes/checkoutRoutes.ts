import {Router} from "express";
import {createNewOrder} from "../controllers/checkoutController";


const router = Router();

router.post('/createOrder', createNewOrder)

export default router;