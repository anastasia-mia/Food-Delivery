import './Location.scss';
import {setIsLocationPopUpDisplayed} from "../../../redux/popUpDisplayingSlice.ts";
import {useDispatch} from "react-redux";
import {Icon} from "../../Icon/Icon.tsx";

export const Location = ({address}: {address: string}) => {
    const dispatch = useDispatch();

    const handleClickLocationPopup = () => {
        dispatch(setIsLocationPopUpDisplayed(true));
    }

    return (
        <div className="location" onClick={handleClickLocationPopup}
             data-testid="location-icon">
            <Icon id={"map-pin"} width={"24"} height={"24"} stroke={"#473C33"} />
            <p data-testid="address-paragraph">{address ? address : 'Enter your location'}</p>
        </div>
    )
}