import './AdminNavBar.scss';
import {Link, useLocation} from "react-router-dom";
import {Icon} from "../../components/Icon/Icon.tsx";

export const AdminNavBar = () => {
    const locationPath = useLocation().pathname;

    return (
        <nav className="admin-navbar">
            <ul className="admin-navbar-tabs">
                <li className={`admin-navbar-tab 
                ${locationPath === '/admin/orders' ? 'admin-navbar-tab-active' : ''}`}
                >
                    <Link to="/admin/orders">
                        <Icon id={"list"}
                              width={"24"}
                              height={"24"}
                              stroke={locationPath === '/admin/orders' ? "white" : "green"}
                        />
                        <p>Orders</p>
                    </Link>
                </li>
                <li className={`admin-navbar-tab 
                ${locationPath === '/admin/messages' ? 'admin-navbar-tab-active' : ''}`}
                >
                    <Link to="/admin/messages">
                        <Icon id={"message"}
                              width={"24"}
                              height={"24"}
                              stroke={locationPath === '/admin/messages' ? "white" : "green"}
                        />
                        <p>Messages</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}