import './Cart.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store.ts";
import {ICartItem} from "../../interfaces/cartInterfaces.ts";
import {useMemo} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useIsRestaurantPage} from "../../hooks/useIsRestaurantPage.ts";
import {CartItem} from './CartItem/CartItem.tsx'
import {setIsCartDisplayed} from "../../redux/popUpDisplayingSlice.ts";

export const Cart = () => {
    const menuItems: ICartItem[] = useSelector((state: RootState) => state.cart.menuItems);
    const chosenRestaurant = useSelector((state: RootState) => state.chosenRestaurant);
    const dispatch: AppDispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();
    const isRestaurantPage = useIsRestaurantPage();

    const totalPrice: number = useMemo(() => {
        return menuItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [menuItems]);

    const proceedToCheckout = () => {
        navigate('/checkout');
        dispatch(setIsCartDisplayed(false))
    }

    return (
        <div className="cart">
            <p className="cart-title">
                {(isRestaurantPage || menuItems.length !== 0) && (
                    <>Your order from <span>{chosenRestaurant?.restaurantName}</span></>
                )}
            </p>
            <div className="cart-body">
                {menuItems.length > 0 ? (
                    menuItems.map((item: ICartItem) => (
                        <div className="cart-item" key={item.id}>
                            <CartItem item={item}/>
                        </div>))
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