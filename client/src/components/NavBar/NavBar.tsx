import useWindowWidth from "../../hooks/useWindowWidth.ts";
import "./NavBar.scss";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoginPopDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {AppDispatch, RootState} from "../../redux/store.ts";
import {NavBarCart} from "./NavBarCart.tsx";
import {Link} from "react-router-dom";

const NavBar = () => {
    const dispatch: AppDispatch = useDispatch();
    const {user, isLoggedIn} = useSelector((state: RootState) => state.auth);
    const windowWidth = useWindowWidth();

    const openLoginPopUp = () => {
        dispatch(setIsLoginPopDisplayed(true))
    }

    return (
        <div className="navbar">
            {windowWidth > 768 &&
                <div className="navbar-tabs">
                    <ul>
                        <Link to="/order-history">
                            <li>Orders</li>
                        </Link>
                    </ul>
                    {isLoggedIn && user ? (
                        <p className="navbar-greeting">Hello, {user}!</p>
                    ) : (
                        <div className="navbar-account" onClick={openLoginPopUp}>
                            <span>Login</span>
                        </div>
                    )}
                </div>
            }
            <NavBarCart />
        </div>
    )
}

export default NavBar;