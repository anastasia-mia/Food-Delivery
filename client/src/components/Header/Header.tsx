import NavBar from "../NavBar/NavBar";
import './Header.scss';
import {Link} from "react-router-dom";
import useGetAddressWithCoords from "../../hooks/useGetAddressWithCoords.ts";
import {useState} from "react";
import useWindowWidth from "../../hooks/useWindowWidth.ts";
import {Location} from "./Location/Location.tsx";
import {setIsBurgerMenuDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {useDispatch} from "react-redux";

export const Header = () => {
    const [address, setAddress] = useState<string>("");
    const windowWidth = useWindowWidth();
    const dispatch = useDispatch();

    useGetAddressWithCoords(setAddress);

    const toggleOpenBurgermenu = () => {
        dispatch(setIsBurgerMenuDisplayed(true));
    }

    return (
        <div className="header">
            <div className="header_top">
                <div className="header_container container">
                    {windowWidth <= 768 &&
                        <div className="header_burgermenu" onClick={toggleOpenBurgermenu}>
                            <span></span>
                        </div>
                    }
                    <Link to="/">
                        <div className="header_logo">DELIVERY</div>
                    </Link>
                    {windowWidth >= 1280 &&
                        <Location address={address}/>
                    }
                    <NavBar/>
                </div>
            </div>
            {windowWidth < 1280 &&
                <div className="header_bottom">
                    <div className="header_bottom_container container">
                        <Location address={address}/>
                    </div>
                </div>
            }
        </div>
    )
}