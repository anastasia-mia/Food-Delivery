import './AdminHeader.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store.ts";
import {Link} from "react-router-dom";
import {setIsAdminBurgerMenuDisplayed} from "../../redux/popUpDisplayingSlice.ts";

export const AdminHeader = () => {
    const {user} = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    return(
        <header className="admin-header">
            <div className="admin-header-burgermenu" onClick={() => dispatch(setIsAdminBurgerMenuDisplayed(true))}>
                <span></span>
            </div>
            <Link to="/">
                <div className="admin-header-logo">DELIVERY <span>Admin</span></div>
            </Link>
            <p className="admin-header-title">Admin Page</p>
            <p className="admin-header-user">{user && `Welcome, ${user}!`}</p>
        </header>
    )
}