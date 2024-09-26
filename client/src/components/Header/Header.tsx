import {NavBar} from "../NavBar/NavBar.tsx";
import './Header.scss';
import {Link} from "react-router-dom";
import sprite from "../../assets/icons/sprite.svg";
import {useEffect, useState} from "react";
import {fetchAddress} from "../LocationPopUp/selectFunctions.ts";
import {ICoords} from "../LocationPopUp/interfaces.ts";
import {useDispatch} from "react-redux";
import {setIsLocationPopUpDisplayed} from "../../redux/popUpDisplayingSlice.ts";
export const Header = () => {
    const [address, setAddress] = useState<string>("");
    const dispatch = useDispatch();

    useEffect(() => {
        const handleStorageChange = () => {
            const storedCoords = localStorage.getItem('coords');
            if (storedCoords) {
                const coords: ICoords = JSON.parse(storedCoords);
                fetchAddress(coords.lat, coords.lon, setAddress);
            }
        };
        window.addEventListener('storageChange', handleStorageChange);
        handleStorageChange();

        return () => window.removeEventListener('storageChange', handleStorageChange);
    }, []);

    const handleClickLocationPopup = () => {
        dispatch(setIsLocationPopUpDisplayed(true));
    }

    return (
        <div className="header">
            <div className="header_container container">
                <Link to="/">
                    <div className="header_logo">DELIVERY</div>
                </Link>
                <div className="header_geolocation" onClick={handleClickLocationPopup}>
                    <svg width="24" height="24">
                        <use
                            href={sprite + "#map-pin"}
                            fill="none"
                            stroke="#006A4E"
                        ></use>
                    </svg>
                    <p>{address ? address : 'Enter your location'}</p>
                </div>
                <NavBar/>
            </div>
        </div>
    )
}