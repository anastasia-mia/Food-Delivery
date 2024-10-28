import NavBar from "../NavBar/NavBar";
import './Header.scss';
import {Link} from "react-router-dom";
const sprite = "/assets/icons/sprite.svg";
import {useDispatch} from "react-redux";
import {setIsLocationPopUpDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import useGetAddressWithCoords from "../../hooks/useGetAddressWithCoords.ts";
import {useState} from "react";

export const Header = () => {
    const [address, setAddress] = useState<string>("");
    const dispatch = useDispatch();

    useGetAddressWithCoords(setAddress)

    const handleClickLocationPopup = () => {
        dispatch(setIsLocationPopUpDisplayed(true));
    }

    return (
        <div className="header">
            <div className="header_container container">
                <Link to="/">
                    <div className="header_logo">DELIVERY</div>
                </Link>
                <div className="header_geolocation" onClick={handleClickLocationPopup} data-testid="location-icon">
                    <svg width="24" height="24">
                        <use
                            href={sprite + "#map-pin"}
                            fill="none"
                            stroke="#473C33"
                        ></use>
                    </svg>
                    <p data-testid="address-paragraph">{address ? address : 'Enter your location'}</p>
                </div>
                <NavBar />
            </div>
        </div>
    )
}