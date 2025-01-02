import {Router} from "express";
import {
    changeOrderStatus,
    createNewOrder,
    getAllOrders,
    getAllStatuses,
    getUserOrders
} from "../controllers/orderController";

const router = Router();

router.post('/createOrder', createNewOrder);
router.get('/getAllOrders', getAllOrders);
router.get('/getAllOrdersByUserId/:id', getUserOrders);
router.put('/changeOrderStatus/:orderId', changeOrderStatus);
router.get('/getAllStatuses', getAllStatuses);

export default router;