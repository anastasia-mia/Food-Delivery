import {Customer, OrderItem} from "../models/orderModel";
import connection from "../config/database";
import {OkPacket, RowDataPacket} from 'mysql2';

export const insertOrder = async (userId: number, total: number, customer: Customer, date: string, orderItems: OrderItem[], restaurantId: number) => {
    const sql = `INSERT INTO orders (total, status_id, user_id, order_date, restaurant_id, comment)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const [orderCreated] = await connection.execute<OkPacket>(sql,
        [total,
            1,
            userId,
            date,
            restaurantId,
            customer.comment
        ]);

    await insertCustomerDetails(orderCreated.insertId, customer);

    await insertOrderItems(orderCreated.insertId, orderItems);
}

export const insertCustomerDetails = async (orderId: number, customer: Customer) => {
    const sql = `
        INSERT INTO order_customer_details (order_id, name, last_name, email, phone_number, address)
        VALUES (?, ?, ?, ?, ?, ?)`;
    await connection.execute(sql,
        [orderId,
            customer.name,
            customer.surName,
            customer.email,
            customer.phoneNumber,
            customer.address,
        ]);
}

export const insertOrderItems = async (orderId: number, orderItems: OrderItem[]) => {
    const sql = `INSERT INTO order_items (order_id, menu_item_id, quantity, price)
                 VALUES ?`;
    const orderItemsData = orderItems.map(item => [orderId, item.id, item.quantity, item.price]);

    await connection.query(sql, [orderItemsData]);
}

export const getOrders = async (userId?: number) => {
    let sql = `SELECT o.id,
                      o.total,
                      o.status_id,
                      o.order_date AS orderDate,
                      o.comment,
                      c.name,
                      c.last_name AS lastName,
                      c.email,
                      c.phone_number AS phoneNumber,
                      c.address,
                      oi.menu_item_id AS menuItemId,
                      oi.quantity,
                      oi.price,
                      r.name AS restaurantName,
                      mi.name AS menuItemName,
                      s.name AS statusName
               FROM orders o
                        JOIN order_customer_details c ON o.id = c.order_id
                        JOIN order_items oi ON o.id = oi.order_id
                        JOIN restaurants r ON o.restaurant_id = r.id
                        JOIN menu_items mi ON oi.menu_item_id = mi.id
                        JOIN statuses s ON o.status_id = s.id`;

    const params: (number | undefined)[] = [];

    if (userId) {
        sql += ` WHERE o.user_id = ?`;
        params.push(userId);
    }

    sql += ` ORDER BY o.order_date DESC`;

    const [rows] = await connection.execute<RowDataPacket[]>(sql, params);
    return rows;
}

export const changeStatus = async(orderId: number, statusId: number): Promise<OkPacket> => {
    const sql = `UPDATE orders SET status_id = ? WHERE id = ?`;
    const [result] = await connection.execute<OkPacket>(sql, [statusId, orderId]);
    return result;
}

export const getStatuses = async() => {
    const sql = `SELECT * FROM statuses`;
    const [rows] = await connection.execute(sql);
    return rows;
}