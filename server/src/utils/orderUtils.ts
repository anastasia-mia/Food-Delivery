import {RowDataPacket} from "mysql2";

export const formatOrders = (ordersData: RowDataPacket[]) => {
    return ordersData.reduce((acc, row) => {
        let order = acc.find(o => o.orderId === row.id);

        if (!order) {
            order = {
                orderId: row.id,
                total: row.total,
                status: {
                    statusId: row.status_id,
                    statusName: row.statusName
                },
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
                orderItems: row.orderItems
            };
            acc.push(order);
        }

        return acc;
    }, []);
};