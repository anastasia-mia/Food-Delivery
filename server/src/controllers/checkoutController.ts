import {insertOrder} from "../queries/checkoutQueries";
import { Request, Response } from 'express';
import {Order} from "../models/CheckoutModel";

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