import {NavBar} from "../NavBar/NavBar.tsx";
import './Header.scss';

export const Header = () => {

    return(
        <div className="header">
            <div className="header_container container">
                <div className="header_logo">DELIVERY</div>
                <NavBar />
            </div>
        </div>
    )
}