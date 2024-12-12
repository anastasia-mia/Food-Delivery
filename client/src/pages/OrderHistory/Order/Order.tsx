import './Order.scss';
import {OrderItems} from "../../../components/OrderItems/OrderItems.tsx";
// import kfc from "/assets/icons/kfc-logo.webp"
// import crepe from '/assets/icons/crepe.png';
import {OrderProgress} from "../OrderProgress/OrderProgress.tsx";
import {formatDate} from "../../../utils/formatDate.ts";
import {IOrder} from "../../../interfaces/interfaces.ts";

export const Order = ({order} : {order: IOrder}) => {

    return (
        <div className={`order ${order.status.statusId === 4 ? 'order-finished' : 'order-created'}`}>
            <div className="order-left">
                {/*<img src={} alt="restaurantLogo"*/}
                {/*     className="order-logo"/>*/}
                <p className="order-text">Order № <span>{order.orderId}</span></p>

                <p className="order-text">Restaurant <span>{order.restaurantName}</span></p>
                <p className="order-text">Status: <span className="order-status">{order.status.statusName}</span></p>
            </div>
            <div className="order-center">
                {order.status.statusId === 4
                    ?
                    <div className="order-items">
                        <OrderItems menuItems={order.orderItems}/>
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