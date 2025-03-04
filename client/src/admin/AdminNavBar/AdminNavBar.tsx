import './AdminNavBar.scss';
import {Link, useLocation} from "react-router-dom";
import {Icon} from "../../components/Icons/Icon.tsx";
import useWindowWidth from "../../hooks/useWindowWidth.ts";
import {setIsAdminBurgerMenuDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {AppDispatch} from "../../redux/store.ts";
import {useDispatch} from "react-redux";

export const AdminNavBar = () => {
    const locationPath = useLocation().pathname;
    const windowWidth = useWindowWidth();
    const dispatch: AppDispatch = useDispatch();

    const closePopUp = () => {
        dispatch(setIsAdminBurgerMenuDisplayed(false));
    }

    return (
        <nav className="admin-navbar">
            {windowWidth <= 768 && (
                <div className="admin-navbar-header">
                    <div className="cross"
                         onClick={() => closePopUp()}>
                    </div>
                </div>
            )}
            <ul className="admin-navbar-tabs">
                <li className={`admin-navbar-tab 
                ${locationPath.includes('/admin/orders') ? 'admin-navbar-tab-active' : ''}`}
                >
                    <Link to="/admin/orders" onClick={() => closePopUp()}>
                        <Icon id={"list"}
                              width={"24"}
                              height={"24"}
                              stroke={locationPath.includes('/admin/orders') ? "white" : "green"}
                        />
                        <p>Orders</p>
                    </Link>
                </li>
                <li className={`admin-navbar-tab 
                ${locationPath.includes('/admin/messages') ? 'admin-navbar-tab-active' : ''}`}
                >
                    <Link to="/admin/messages" onClick={() => closePopUp()}>
                        <Icon id={"message"}
                              width={"24"}
                              height={"24"}
                              stroke={locationPath.includes('/admin/messages') ? "white" : "green"}
                        />
                        <p>Messages</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}