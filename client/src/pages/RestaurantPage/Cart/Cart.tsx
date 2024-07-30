import './Cart.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";
import {CartItem} from "../../../models/interfaces/interfaces.ts";
import {useEffect, useState} from "react";

export const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const menuItems: CartItem[] = useSelector((state: RootState) => state.cart.menuItems);

    useEffect(() => {
        const total = menuItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [menuItems]);

    return (
        <div className="cart_wrapper">
            <div className="cart">
                <p className="cart_title">Your order</p>
                <div className="cart_body">
                    {menuItems.length > 0 ? (
                        menuItems.map((item: CartItem, index: number) => (
                                <div className="cart_item" key={index}>
                                    <div className="cart_item_top">
                                        <p className="cart_item_quantity">{item.quantity}x</p>
                                        <p className="cart_item_name">{item.name}</p>
                                        <p className="cart_item_price">{item.price}€</p>
                                    </div>
                                    <div className="cart_item_bottom">
                                        <div className="cart_item_btn"><span>-</span></div>
                                        <div className="cart_item_btn"><span>+</span></div>
                                    </div>
                                </div>
                            ))
                    ) : <div className="cart_empty">The cart is empty</div>}
                </div>
                <div className="cart_sum">
                    <p className="cart_sum_text">Total:</p>
                    <p className="cart_sum_total">{totalPrice.toFixed(2)}€</p>
                </div>
            </div>
        </div>
    )
}