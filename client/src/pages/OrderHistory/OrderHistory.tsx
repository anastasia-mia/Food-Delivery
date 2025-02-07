import './OrderHistory.scss';
import {Order} from "./Order/Order.tsx";
import {useEffect, useState} from "react";
import axiosInstance from "../../../axiosConfig.ts";
import {IOrder} from "../../interfaces/orderInterfaces.ts";
import {Pagination} from "../../components/Pagination/Pagination.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import useScrollToTop from "../../hooks/useScrollToTop.ts";

export const OrderHistory = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const {userId} = useSelector((state: RootState) => state.auth);
    useScrollToTop();

    useEffect(() => {
        axiosInstance.get(`/getAllOrdersByUserId/${userId}`, {params: {page}})
            .then((res) => {
                setOrders(res.data.orders)
                setHasNextPage(res.data.hasNextPage);
            })
    }, [page]);

    return (
        <section className="order-history">
            <div className="container">
                <div className="order-history-header">
                    <p className="order-history-title">Order History</p>
                    <p className="order-history-total">Total orders: {orders.length}</p>
                </div>
                {orders.length > 0 ? (
                    <div className="order-history-body">
                        {orders.map((order: IOrder) => (
                            <div key={order.orderId}>
                                <Order order={order}/>
                            </div>

                        ))}
                    </div>
                ) : <p className="order-history-text">You have no orders</p>}
            </div>
            <Pagination page={page} hasNextPage={hasNextPage} setNewPage={setPage}/>
        </section>
    )
}