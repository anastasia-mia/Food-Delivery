import './AdminOrders.scss';
import {useEffect, useState} from "react";
import {Statuses} from "./Statuses/Statuses.tsx";
import axiosInstance from "../../../axiosConfig.ts";
import {formatDate} from "../../utils/formatDate.ts";
import {IOrder} from "../../interfaces/orderInterfaces.ts";
import {Pagination} from "../../components/Pagination/Pagination.tsx";

export const AdminOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);

    useEffect(() => {
        axiosInstance.get('/getAllOrders', {params: {page}}).then((res) => {
            setOrders(res.data.orders)
            setHasNextPage(res.data.hasNextPage);
        })
    }, [page]);

    return (
        <div className="admin-orders">
            <div className="admin-orders-headers">
                <p>ID</p>
                <p>Restaurant name</p>
                <p>Date</p>
                <p>Status</p>
            </div>
            <div className="admin-orders-items">
                {orders.map((element: IOrder) => (
                    <div className="admin-orders-item" key={element.orderId}>
                        <p>{element.orderId}</p>
                        <p>{element.restaurantName}</p>
                        <p>{formatDate(element.orderDate)}</p>
                        <Statuses status={element.status} orderId={element.orderId} />
                    </div>
                ))}
            </div>
            <Pagination
                page={page}
                hasNextPage={hasNextPage}
                setNewPage={setPage}
            />
        </div>
    )
}