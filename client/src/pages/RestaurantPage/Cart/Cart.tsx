import './Cart.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";
import {CartItem} from "../../../models/interfaces/interfaces.ts";

export const Cart = () => {
    const menuItems: CartItem[] = useSelector((state: RootState) => state.cart.menuItems);

    return (
        <div className="cart">
            <p className="cart_title">Your order</p>
            <div className="cart_body">
            </div>
            <div className="cart_sum"></div>
        </div>
    )
}