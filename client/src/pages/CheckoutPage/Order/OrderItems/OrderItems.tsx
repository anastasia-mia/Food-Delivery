import './OrderItems.scss';
import {ICartItem} from "../../../../interfaces/interfaces.ts";

export const OrderItems = ({menuItems}: {menuItems: ICartItem[]}) => {

    return (
        <div className="order_items">
            <div className="order_headers">
                <p>Dish</p>
                <p>Quantity</p>
                <p>Price</p>
            </div>
            {menuItems.map((item: ICartItem, index: number) => (
                <div key={index} className="order_item" data-testid="order-item">
                    <p>{item.name}</p>
                    <p>{item.quantity}х</p>
                    <p>{(item.price * item.quantity).toFixed(2)}€</p>
                </div>
            ))}
        </div>
    )
}