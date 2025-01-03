import './AdminOrders.scss';
import {useEffect, useState} from "react";
import {Statuses} from "./Statuses/Statuses.tsx";
import axios from "axios";
import {formatDate} from "../../utils/formatDate.ts";
import {IOrder} from "../../interfaces/orderInterfaces.ts";

export const AdminOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([])

    useEffect(() => {
        axios.get('http://localhost:3001/api/getAllOrders', {withCredentials: true})
            .then((res) => setOrders(res.data))
    }, []);

    return (
        <div className="admin-orders">
            <div className="admin-orders-headers">
                <p>ID</p>
                <p>Restaurant name</p>
                <p>Date</p>
                <p>Status</p>
            </div>
            {orders.map((element: IOrder) => (
                <div className="admin-orders-item" key={element.orderId}>
                    <p>{element.orderId}</p>
                    <p>{element.restaurantName}</p>
                    <p>{formatDate(element.orderDate)}</p>
                    <Statuses status={element.status} orderId={element.orderId} />
                </div>
            ))}
        </div>
    )
}