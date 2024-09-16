import {getOrders, insertOrder} from "../queries/orderQueries";
import { Request, Response } from 'express';
import {Order} from "../models/orderModel";
import {formatOrders} from "../utils/orderUtils";

export const createNewOrder = async (req: Request, res: Response): Promise<void> => {
    try{
        const { customer, orderItems, total, order_date }: Order = req.body;

        if (!customer) {
            res.status(400).json({ message: 'There are no customer details' });
            return;
        }else if(!orderItems || orderItems.length === 0){
            res.status(400).json({ message: 'There are no products in cart' });
            return;
        }

        const formattedDate = new Date(order_date).toISOString().split('T')[0];

        await insertOrder(total, customer, formattedDate, orderItems);

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