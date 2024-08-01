import './Cart.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store.ts";
import {CartItem} from "../../../models/interfaces/interfaces.ts";
import {useEffect, useState} from "react";
import {increaseQuantity, decreaseQuantity} from '../../../redux/cartSlice.ts'

export const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const menuItems: CartItem[] = useSelector((state: RootState) => state.cart.menuItems);
    const dispatch : AppDispatch = useDispatch();

    useEffect(() => {
        const total = menuItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [menuItems]);

    const decreaseAmount = (id: number): void => {
        dispatch(decreaseQuantity(id))
    }

    const increaseAmount = (id: number): void => {
        dispatch(increaseQuantity(id))
    }

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
                                        <div className="cart_item_btn"
                                             onClick={() => decreaseAmount(item.id as number)}>
                                            <span>-</span>
                                        </div>
                                        <div className="cart_item_btn"
                                             onClick={() => increaseAmount(item.id as number)}>
                                            <span>+</span>
                                        </div>
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