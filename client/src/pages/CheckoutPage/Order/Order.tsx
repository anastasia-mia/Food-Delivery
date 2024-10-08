import {CartItem} from "../../../interfaces/interfaces.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";
import './Order.scss';

export const Order = () => {
    const menuItems: CartItem[] = useSelector((state: RootState) => state.cart.menuItems);
    const price: number = useSelector((state: RootState) => state.deliveryPrice.price)
    const serviceFee: number = 0.90;
    const totalCartPrice: number =
        (menuItems.reduce((acc, item) => acc + item.price * item.quantity, 0)) + serviceFee + price;


    return(
        <div className="order">
            <div className="order_container">
                <div className="order_title">Your order</div>
                <div className="order_items">
                    <div className="order_headers">
                        <p>Dish</p>
                        <p>Quantity</p>
                        <p>Price</p>
                    </div>
                    {menuItems.map((item: CartItem, index: number) => (
                        <div key={index} className="order_item">
                            <p className="order_item_name">{item.name}</p>
                            <p className="order_item_quantity">{item.quantity}</p>
                            <p className="order_item_price">{(item.price * item.quantity).toFixed(2)}€</p>
                        </div>
                    ))}
                </div>
                <div className="order_payment">
                    <div className="order_payment_fee">
                        <p>Service fee:</p>
                        <p>{serviceFee}€</p>
                    </div>
                    <div className="order_payment_fee">
                        <p>Delivery:</p>
                        <p>{price}€</p>
                    </div>
                    <div className="order_payment_total">
                        <p>Total:</p>
                        <p>{totalCartPrice.toFixed(2)}€</p>
                    </div>
                </div>
            </div>
        </div>
    )
}