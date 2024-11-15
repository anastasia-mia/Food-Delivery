import useWindowWidth from "../../hooks/useWindowWidth.ts";
const sprite = "/assets/icons/sprite.svg";
import "./NavBar.scss";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoginPopDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {AppDispatch, RootState} from "../../redux/store.ts";
import {CartItem} from "../../interfaces/interfaces.ts";

const NavBar = () => {
    const dispatch: AppDispatch = useDispatch();
    const {user, isLoggedIn} = useSelector((state: RootState) => state.auth);
    const menuItems: CartItem[] = useSelector((state: RootState) => state.cart.menuItems);
    const totalQuantity: number = menuItems.reduce((total: number, item: CartItem) => total + item.quantity, 0);
    const windowWidth = useWindowWidth();

    const openLoginPopUp = () => {
        dispatch(setIsLoginPopDisplayed(true))
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
            <div className="navbar_cart">
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