import './AdminHeader.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {Link} from "react-router-dom";

export const AdminHeader = () => {
    const {user} = useSelector((state: RootState) => state.auth);

    return(
        <header className="admin-header">
            <Link to="/">
                <div className="admin-header-logo">DELIVERY <span>Admin</span></div>
            </Link>
            <p className="admin-header-title">Admin Page</p>
            <p className="admin-header-user">{user && `Welcome, {user}!`}</p>
        </header>
    )
}