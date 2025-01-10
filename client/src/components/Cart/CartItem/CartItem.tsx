import './CartItem.scss';
import {decreaseQuantity, increaseQuantity} from "../../../redux/cartSlice.ts";
import {AppDispatch} from "../../../redux/store.ts";
import {useDispatch} from "react-redux";
import {ICartItem} from "../../../interfaces/cartInterfaces.ts";

export const CartItem = ({item}: {item: ICartItem}) => {
    const dispatch: AppDispatch = useDispatch();

    const decreaseAmount = (itemId: number): void => {
        dispatch(decreaseQuantity(itemId))
    }

    const increaseAmount = (itemId: number): void => {
        dispatch(increaseQuantity(itemId))
    }

    return (
        <>
            <div className="cart-item-top">
                <p className="cart-item-quantity">{item.quantity}x</p>
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">{item.price}€</p>
            </div>
            <div className="cart-item-bottom">
                <div className="cart-item-btn"
                     onClick={() => decreaseAmount(item.id as number)}>
                    <span>-</span>
                </div>
                <div className="cart-item-btn"
                     onClick={() => increaseAmount(item.id as number)}>
                    <span>+</span>
                </div>
            </div>
        </>
    )
}