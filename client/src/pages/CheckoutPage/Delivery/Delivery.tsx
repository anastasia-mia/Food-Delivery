import {useState} from "react";
import useGetAddressWithCoords from "../../../hooks/useGetAddressWithCoords.ts";
import './Delivery.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";

export const Delivery = () => {
    const [addressClient, setAddressClient] = useState<string>('');
    const {restaurantAddress} = useSelector((state: RootState )=> state.chosenRestaurant);
    const {time, distance} = useSelector((state: RootState )=> state.deliveryPrice)

    useGetAddressWithCoords(setAddressClient);

    return(
        <div className="delivery">
            <div className="delivery-name">
                <span>From</span>
                <p>{restaurantAddress}</p>
            </div>
            <div className="delivery-name">
                <span>To</span>
                <p>{addressClient}</p>
            </div>
            <div className="delivery-name">
                <span>Distance</span>
                <p>{distance.toFixed(2)} km</p>
            </div>
            <div className="delivery-name">
                <span>Time</span>
                <p>{time.toFixed(2)} minutes</p>
            </div>
        </div>
    )
}