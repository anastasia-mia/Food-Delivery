import {Router} from "express";
import {createNewOrder, getAllOrders, getUserOrders} from "../controllers/orderController";


const router = Router();

router.post('/createOrder', createNewOrder);
router.get('/getAllOrders', getAllOrders);
router.get('/getAllOrdersByUserId/:id', getUserOrders);

export default router;