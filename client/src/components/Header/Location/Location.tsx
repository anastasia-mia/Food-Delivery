import './Location.scss';
import {setIsLocationPopUpDisplayed} from "../../../redux/popUpDisplayingSlice.ts";
import {useDispatch} from "react-redux";
const sprite = "/assets/icons/sprite.svg";

export const Location = ({address}: {address: string}) => {
    const dispatch = useDispatch();

    const handleClickLocationPopup = () => {
        dispatch(setIsLocationPopUpDisplayed(true));
    }

    return (
        <div className="location" onClick={handleClickLocationPopup}
             data-testid="location-icon">
            <svg width="24" height="24">
                <use
                    href={sprite + "#map-pin"}
                    fill="none"
                    stroke="#473C33"
                ></use>
            </svg>
            <p data-testid="address-paragraph">{address ? address : 'Enter your location'}</p>
        </div>
    )
}