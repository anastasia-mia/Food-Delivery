import NavBar from "../NavBar/NavBar";
import './Header.scss';
import {Link} from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth.ts";
import {Location} from "./Location/Location.tsx";
import {setIsBurgerMenuDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {useDispatch} from "react-redux";

export const Header = () => {
    const windowWidth = useWindowWidth();
    const dispatch = useDispatch();

    const toggleOpenBurgermenu = () => {
        dispatch(setIsBurgerMenuDisplayed(true));
    }

    return (
        <header className="header">
            <div className="header-top">
                <div className="header-container container">
                    {windowWidth <= 768 &&
                        <div className="header-burgermenu" onClick={toggleOpenBurgermenu}>
                            <span></span>
                        </div>
                    }
                    <Link to="/">
                        <div className="header-logo">DELIVERY</div>
                    </Link>
                    {windowWidth >= 1280 &&
                        <Location />
                    }
                    <NavBar/>
                </div>
            </div>
            {windowWidth < 1280 &&
                <div className="header-bottom">
                    <div className="header-bottom-container container">
                        <Location />
                    </div>
                </div>
            }
        </header>
    )
}