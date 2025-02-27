import './Order.scss';
import {OrderItems} from "../../../components/OrderItems/OrderItems.tsx";
import {OrderProgress} from "../OrderProgress/OrderProgress.tsx";
import {formatDate} from "../../../utils/formatDate.ts";
import {IOrder} from "../../../interfaces/orderInterfaces.ts";

export const Order = ({order} : {order: IOrder}) => {
    const parsedOrderItems = typeof order.orderItems === "string" ? JSON.parse(order.orderItems) : order.orderItems;

    return (
        <div className={`order ${order.status.statusId === 4 ? 'order-finished' : 'order-created'}`}>
            <div className="order-left">
                <div className="order-logo">
                    <img src={`${import.meta.env.VITE_API_URL}/media/restaurants/${order.logoPath}`}
                         alt="restaurantLogo"
                    />
                </div>
                <p className="order-text">Order № <span>{order.orderId}</span></p>

                <p className="order-text">Restaurant <span>{order.restaurantName}</span></p>
                <p className="order-text">Status: <span className="order-status">{order.status.statusName}</span></p>
            </div>
            <div className="order-center">
                {order.status.statusId === 4
                    ?
                    <div className="order-items">
                        <OrderItems menuItems={parsedOrderItems}/>
                    </div>
                    : <OrderProgress statusId={order.status.statusId} statusName={order.status.statusName} />}
            </div>
            <div className="order-right">
                <p className="order-date">{formatDate(order.orderDate)}</p>
                <p className="order-text">Total: <span>{order.total} €</span></p>
            </div>
        </div>
    )
}