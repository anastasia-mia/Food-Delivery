import './CartItem.scss';
import {decreaseQuantity, increaseQuantity} from "../../../redux/cartSlice.ts";
import {AppDispatch} from "../../../redux/store.ts";
import {useDispatch} from "react-redux";
import {ICartItem} from "../../../interfaces/cartInterfaces.ts";

interface CartItemProps{
    item: ICartItem,
    itemIndex: number
}

export const CartItem = ({item, itemIndex}: CartItemProps) => {
    const dispatch: AppDispatch = useDispatch();

    const decreaseAmount = (itemId: number): void => {
        dispatch(decreaseQuantity(itemId))
    }

    const increaseAmount = (itemId: number): void => {
        dispatch(increaseQuantity(itemId))
    }

    return (
        <div className="cart_item" key={itemIndex}>
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
    )
}