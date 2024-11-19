import useWindowWidth from "../../hooks/useWindowWidth.ts";
const sprite = "/assets/icons/sprite.svg";
import "./NavBar.scss";
import {useDispatch, useSelector} from "react-redux";
import {setIsCartDisplayed, setIsLoginPopDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {AppDispatch, RootState} from "../../redux/store.ts";
import {ICartItem} from "../../interfaces/interfaces.ts";
import {useIsRestaurantPage} from "../../hooks/useIsRestaurantPage.ts";
import {toggleHighlightCart} from "../../redux/cartSlice.ts";

const NavBar = () => {
    const dispatch: AppDispatch = useDispatch();
    const {user, isLoggedIn} = useSelector((state: RootState) => state.auth);
    const menuItems: ICartItem[] = useSelector((state: RootState) => state.cart.menuItems);
    const totalQuantity: number = menuItems.reduce((total: number, item: ICartItem) => total + item.quantity, 0);
    const windowWidth = useWindowWidth();
    const isRestaurantPage = useIsRestaurantPage();

    const openLoginPopUp = () => {
        dispatch(setIsLoginPopDisplayed(true))
    }

    const openCart = () => {
        if(isRestaurantPage && windowWidth >= 1280){
            dispatch(toggleHighlightCart(true));
            setTimeout(() => {
                dispatch(toggleHighlightCart(false));
            }, 2000);
        }else{
            dispatch(setIsCartDisplayed(true));
        }
    }

    return (
        <div className="navbar">
            {windowWidth > 768 &&
                <div className="navbar_tabs">
                    <ul>
                        <li>Orders</li>
                    </ul>
                    {isLoggedIn && user ? (
                        <p className="navbar_greeting">Hello, {user}!</p>
                    ) : (
                        <div className="navbar_account" onClick={openLoginPopUp}>
                            <span>Login</span>
                        </div>
                    )}
                </div>
            }
            <div className="navbar_cart" onClick={openCart}>
                <svg width="26" height="26" data-testid="navbar-cart">
                    <use
                        href={sprite + "#cart"}
                        fill="none"
                        stroke="#473C33"
                    ></use>
                </svg>
                {menuItems.length !== 0 && <span data-testid="navbar-cart-quantity">{totalQuantity}</span>}
            </div>
        </div>
    )
}

export default NavBar;