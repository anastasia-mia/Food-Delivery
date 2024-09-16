import {RowDataPacket} from "mysql2";

export const formatOrders = (ordersData: RowDataPacket[]) => {
    return ordersData.reduce((acc, row) => {
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
};