import './OrderHistory.scss';
import {Order} from "./Order/Order.tsx";
import {useEffect, useState} from "react";
import axiosInstance from "../../../axiosConfig.ts";

export const OrderHistory = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axiosInstance.get("/getAllOrdersByUserId/4").then((res) => setOrders(res.data))
    }, []);

    return(
        <section className="order-history">
            <div className="container">
                <div className="order-history-header">
                    <p className="order-history-title">Order History</p>
                    <p className="order-history-total">Total orders: {orders.length}</p>
                </div>
                <div className="order-history-body">
                    {orders.map((order, index) => (
                        <div key={index}>
                            <Order order={order}/>
                        </div>

                    ))}
                </div>
            </div>
        </section>
    )
}