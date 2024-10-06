import sprite from '../../assets/icons/sprite.svg';
import "./NavBar.scss";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoginPopDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {AppDispatch, RootState} from "../../redux/store.ts";
import {CartItem} from "../../models/interfaces/interfaces.ts";

export const NavBar = () => {
    const dispatch: AppDispatch = useDispatch();
    const {user, isLoggedIn} = useSelector((state: RootState) => state.auth);
    const menuItems: CartItem[] = useSelector((state: RootState) => state.cart.menuItems);
    const totalQuantity = menuItems.reduce((total, item) => total + item.quantity, 0);

    const openLoginPopUp = () => {
        dispatch(setIsLoginPopDisplayed(true))
    }

    return (
        <div className="navbar">
            <ul>
                <li>Orders</li>
            </ul>
            {isLoggedIn ? (
                <p className="navbar_greeting">Hello, {user}!</p>
            ) : (
                <div className="navbar_account" onClick={openLoginPopUp}>
                    <span>Login</span>
                </div>
            )}
            <div className="navbar_cart">
                <svg width="26" height="26">
                <use
                        href={sprite + "#cart"}
                        fill="none"
                        stroke="#473C33"
                    ></use>
                </svg>
                {menuItems.length !== 0 && <span>{totalQuantity}</span>}
            </div>
        </div>
    )
}