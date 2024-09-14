import {Customer, OrderItem} from "../models/CheckoutModel";
import {connection} from "../config/database";
import { OkPacket } from 'mysql2';

export const insertOrder = async(total: number, customer: Customer, date: string, orderItems: OrderItem[]) => {
    const sql = `INSERT INTO orders (total, status, user_id, order_date, shipping_address) VALUES (?, ?, ?, ?, ?)`;
    const [orderCreated] = await connection.execute<OkPacket>(sql,
        [total,
            "received",
            customer.user_id,
            date,
            customer.address
        ]);

    await insertCustomerDetails(orderCreated.insertId, customer);

    await insertOrderItems(orderCreated.insertId, orderItems);
}

export const insertCustomerDetails = async(orderId: number, customer: Customer) => {
    const sql = `
    INSERT INTO order_customer_details (order_id, name, last_name, email, phone_number, address, comment) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    await connection.execute(sql,
        [orderId,
            customer.name,
            customer.last_name,
            customer.email,
            customer.phone_number,
            customer.address,
            customer.comment
        ]);
}

export const insertOrderItems = async(orderId: number, orderItems: OrderItem[]) => {
    const sql = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?`;
    const orderItemsData = orderItems.map(item => [orderId, item.id, item.quantity, item.price]);

    await connection.query(sql, [orderItemsData]);
}