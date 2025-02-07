import {changeStatus, getOrders, getStatuses, insertOrder} from "../queries/orderQueries";
import { Request, Response } from 'express';
import {Order} from "../models/orderModel";
import {formatOrders} from "../utils/orderUtils";
import 'express-session';

export const createNewOrder = async (req: Request, res: Response): Promise<void> => {
    try{
        const userId = req.session.user?.userId;
        const guestId = req.session.guestId;

        const { customer, orderItems, total, restaurantId}: Order = req.body;

        if (!customer) {
            res.status(400).json({ message: 'There are no customer details' });
            return;
        }else if(!orderItems || orderItems.length === 0){
            res.status(400).json({ message: 'There are no products in cart' });
            return;
        }

        const formattedDate = new Date().toISOString().split('T')[0];

        await insertOrder(userId ? userId : guestId, total, customer, formattedDate, orderItems, restaurantId);

        res.status(200).json({message: 'The order is added'})
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

export const getUserOrders = async(req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id, 10);
    const guestId = req.session.guestId;
    const page: number = parseInt(req.query.page as string, 10) || 1;

    if (!userId && !guestId) {
        res.status(400).json({ message: 'Invalid client ID' });
        return;
    }

    try{
        const ordersData = await getOrders(page, userId || guestId);
        const orders = formatOrders(ordersData.orders);

        res.status(200).json({orders, hasNextPage: ordersData.hasNextPage});
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

export const getAllOrders = async (req: Request, res: Response) => {
    try{
        const page: number = parseInt(req.query.page as string, 10) || 1;

        const ordersData = await getOrders(page);
        const orders = formatOrders(ordersData.orders);

        res.status(200).json({orders, hasNextPage: ordersData.hasNextPage});
    }catch(err){
        res.status(400).json({ message: err.message });
    }

}

export const changeOrderStatus = async(req: Request, res: Response) => {
    const {orderId} = req.params;
    const {statusId} = req.body;

    try{
        const result = await changeStatus(Number(orderId), Number(statusId));

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found!' });
        }

        res.status(200).json({ message: 'Order status updated!' });
    }catch{
        res.status(500).json('Internal Server Error')
    }
}

export const getAllStatuses = async(req: Request, res: Response) => {
    try{
        const statuses = await getStatuses();

        res.status(200).json(statuses);
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}