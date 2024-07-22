import {NavBar} from "../NavBar/NavBar.tsx";
import './Header.scss';
import {Link} from "react-router-dom";

export const Header = () => {

    return (
        <div className="header">
            <div className="header_container container">
                <Link to="/">
                    <div className="header_logo">DELIVERY</div>
                </Link>
                <NavBar/>
            </div>
        </div>
    )
}