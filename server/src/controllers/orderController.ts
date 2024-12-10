import {getOrders, insertOrder} from "../queries/orderQueries";
import { Request, Response } from 'express';
import {Order} from "../models/orderModel";
import {formatOrders} from "../utils/orderUtils";
import 'express-session';

export const createNewOrder = async (req: Request, res: Response): Promise<void> => {
    try{
        const userId = req.session.user.userId;

        if (!userId) {
            res.status(401).json({ message: 'User is not authenticated' });
            return;
        }

        const { customer, orderItems, total, restaurantId}: Order = req.body;

        if (!customer) {
            res.status(400).json({ message: 'There are no customer details' });
            return;
        }else if(!orderItems || orderItems.length === 0){
            res.status(400).json({ message: 'There are no products in cart' });
            return;
        }

        const formattedDate = new Date().toISOString().split('T')[0];

        await insertOrder(userId, total, customer, formattedDate, orderItems, restaurantId);

        res.status(200).json({message: 'The order is added'})
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

export const getUserOrders = async(req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
        res.status(400).json({ message: 'Invalid user ID' });
        return;
    }

    try{
        const ordersData = await getOrders(userId);
        const orders = formatOrders(ordersData);

        res.status(200).json(orders);
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

export const getAllOrders = async (req: Request, res: Response) => {
    try{
        const ordersData = await getOrders();
        const orders = formatOrders(ordersData);

        res.status(200).json(orders);
    }catch(err){
        res.status(400).json({ message: err.message });
    }

}