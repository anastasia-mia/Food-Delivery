import sprite from '../../assets/icons/sprite.svg';
import "./NavBar.scss";

export const NavBar = () => {
    return (
        <div className="navbar">
            <div className="navbar_account">
                <svg width="32" height="32">
                    <use
                        href={sprite + "#account"}
                        fill="none"
                        stroke="#006A4E"
                    ></use>
                </svg>
            </div>
            <div className="navbar_cart">
                <svg width="26" height="26">
                    <use
                        href={sprite + "#cart"}
                        fill="none"
                        stroke="#006A4E"
                    ></use>
                </svg>
            </div>
        </div>
    )
}