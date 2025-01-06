import './Cart.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store.ts";
import {ICartItem} from "../../interfaces/cartInterfaces.ts";
import {useEffect, useMemo} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {setRestaurant} from "../../redux/chosenRestaurantSlice.ts";
import {useIsRestaurantPage} from "../../hooks/useIsRestaurantPage.ts";
import {CartItem} from './CartItem/CartItem.tsx'
import {setIsCartDisplayed} from "../../redux/popUpDisplayingSlice.ts";

export const Cart = () => {
    const menuItems: ICartItem[] = useSelector((state: RootState) => state.cart.menuItems);
    const chosenRestaurant = useSelector((state: RootState) => state.chosenRestaurant);
    const {id, restaurant} = useSelector((state: RootState) => state.currentRestaurant)
    const dispatch: AppDispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();
    const isRestaurantPage = useIsRestaurantPage();

    const totalPrice: number = useMemo(() => {
        return menuItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [menuItems]);

    useEffect(() => {
        if (restaurant && restaurant.name && menuItems.length === 0) {
            dispatch(setRestaurant({restaurant_id: id as number, restaurantName: restaurant.name}))
        }
    }, [menuItems, restaurant]);

    const proceedToCheckout = () => {
        navigate('/checkout');
        dispatch(setIsCartDisplayed(false))
    }

    return (
        <div className="cart">
            <p className="cart-title">
                Your order
                {(isRestaurantPage || menuItems.length !== 0) && (
                    <> from <span>{chosenRestaurant?.restaurantName}</span></>
                )}
            </p>
            <div className="cart-body">
                {menuItems.length > 0 ? (
                    menuItems.map((item: ICartItem, index: number) => (
                        <CartItem item={item} itemIndex={index}/>
                    ))
                ) : <div className="cart-empty">The cart is empty</div>}
            </div>
            <div className="cart-sum">
                <p className="cart-sum-text">Total:</p>
                <p className="cart-sum-total">{totalPrice.toFixed(2)}€</p>
            </div>
            <button className="cart-button"
                    onClick={proceedToCheckout}
                    disabled={menuItems.length === 0}
            >
                PROCEED TO CHECKOUT
            </button>
        </div>
    )
}