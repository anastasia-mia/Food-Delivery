import {RowDataPacket} from "mysql2";

export const formatOrders = (ordersData: RowDataPacket[]) => {
    return ordersData.reduce((acc, row) => {
        let order = acc.find(o => o.orderId === row.id);

        if (!order) {
            order = {
                orderId: row.id,
                total: row.total,
                status: row.status,
                orderDate: row.orderDate,
                shippingAddress: row.shippingAddress,
                comment: row.comment,
                restaurantName: row.restaurantName,
                customer: {
                    name: row.name,
                    lastName: row.lastName,
                    email: row.email,
                    phoneNumber: row.phoneNumber,
                    address: row.address,
                },
                orderItems: []
            };
            acc.push(order);
        }

        order.orderItems.push({
            menuItemId: row.menuItemId,
            menuItemName: row.menuItemName,
            quantity: row.quantity,
            price: row.price
        });

        return acc;
    }, []);
};