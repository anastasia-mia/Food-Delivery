import sprite from '../../assets/icons/sprite.svg';
import "./NavBar.scss";
import {useDispatch} from "react-redux";
import {setIsLoginPopDisplayed} from "../../redux/popUpDisplayingSlice.ts";

export const NavBar = () => {
    const dispatch = useDispatch();

    const openLoginPopUp = () => {
        dispatch(setIsLoginPopDisplayed(true))
    }

    return (
        <div className="navbar">
            <div className="navbar_account" onClick={openLoginPopUp}>
                <span>Login</span>
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