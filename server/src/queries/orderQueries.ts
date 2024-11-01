import {Customer, OrderItem} from "../models/orderModel";
import connection from "../config/database";
import {OkPacket, RowDataPacket} from 'mysql2';

export const insertOrder = async (userId: number, total: number, customer: Customer, date: string, orderItems: OrderItem[]) => {
    const sql = `INSERT INTO orders (total, status, user_id, order_date, shipping_address)
                 VALUES (?, ?, ?, ?, ?)`;
    const [orderCreated] = await connection.execute<OkPacket>(sql,
        [total,
            "received",
            userId,
            date,
            customer.address
        ]);

    await insertCustomerDetails(orderCreated.insertId, customer);

    await insertOrderItems(orderCreated.insertId, orderItems);
}

export const insertCustomerDetails = async (orderId: number, customer: Customer) => {
    const sql = `
        INSERT INTO order_customer_details (order_id, name, last_name, email, phone_number, address, comment)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    await connection.execute(sql,
        [orderId,
            customer.name,
            customer.surName,
            customer.email,
            customer.phoneNumber,
            customer.address,
            customer.comment
        ]);
}

export const insertOrderItems = async (orderId: number, orderItems: OrderItem[]) => {
    const sql = `INSERT INTO order_items (order_id, product_id, quantity, price)
                 VALUES ?`;
    const orderItemsData = orderItems.map(item => [orderId, item.id, item.quantity, item.price]);

    await connection.query(sql, [orderItemsData]);
}

export const getOrders = async (userId?: number) => {
    let sql = `SELECT o.id,
                        o.total,
                        o.status,
                        o.order_date,
                        o.shipping_address,
                        c.name,
                        c.last_name,
                        c.email,
                        c.phone_number,
                        c.address,
                        c.comment,
                        oi.product_id,
                        oi.quantity,
                        oi.price
                 FROM orders o
                          JOIN
                      order_customer_details c ON o.id = c.order_id
                          JOIN
                      order_items oi ON o.id = oi.order_id`

    const params: (number | undefined)[] = [];

    if (userId) {
        sql += ` WHERE o.user_id = ?`;
        params.push(userId);
    }

    const [rows] = await connection.execute<RowDataPacket[]>(sql, params);
    return rows;
}