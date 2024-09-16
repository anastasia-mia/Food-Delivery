import {getAllUserOrders, insertOrder} from "../queries/checkoutQueries";
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

export const getUserOrders = async(req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
        res.status(400).json({ message: 'Invalid user ID' });
        return;
    }

    try{
        const ordersData = await getAllUserOrders(userId);

        const orders = ordersData.reduce((acc, row) => {
            let order = acc.find(o => o.order_id === row.id);

            if (!order) {
                order = {
                    order_id: row.id,
                    total: row.total,
                    status: row.status,
                    order_date: row.order_date,
                    shipping_address: row.shipping_address,
                    customer: {
                        name: row.name,
                        last_name: row.last_name,
                        email: row.email,
                        phone_number: row.phone_number,
                        address: row.address,
                        comment: row.comment
                    },
                    orderItems: []
                };
                acc.push(order);
            }

            order.orderItems.push({
                product_id: row.product_id,
                quantity: row.quantity,
                price: row.price
            });

            return acc;
        }, []);

        res.status(200).json(orders);
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}