import {Router} from "express";
import {createNewOrder, getUserOrders} from "../controllers/checkoutController";


const router = Router();

router.post('/createOrder', createNewOrder)
router.get('/getAllOrdersByUserId/:id', getUserOrders)

export default router;