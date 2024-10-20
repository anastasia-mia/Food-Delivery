import './CheckoutPage.scss';
import {Order} from "./Order/Order.tsx";
import Map from "../../components/Map/Map.tsx";
import useStoredCoords from "../../hooks/useStoredCoords.ts";
import {useEffect, useState} from "react";
import {setIsLocationPopUpDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {useDispatch} from "react-redux";
import {ICoords} from "../../interfaces/geoInterfaces.ts";
import {CustomerInfo} from "./CustomerInfo/CustomerInfo.tsx";
import {Delivery} from "./Delivery/Delivery.tsx";

export const CheckoutPage = () => {
    const storedCoords = useStoredCoords();
    const [coords, setCoords] = useState<ICoords>({lat: 0, lon: 0});
    const dispatch = useDispatch();

    useEffect(() => {
        const handleStorageChange = () => {
            const storedCoords = localStorage.getItem('coords');
            if (storedCoords) {
                const coords: ICoords = JSON.parse(storedCoords);
                setCoords(coords)
            }
        };
        window.addEventListener('storageChange', handleStorageChange);
        handleStorageChange();

        return () => window.removeEventListener('storageChange', handleStorageChange);
    }, []);

    useEffect(() => {
        if(storedCoords.lat === 0 && storedCoords.lon === 0) {
            dispatch(setIsLocationPopUpDisplayed(true))
        }else{
            dispatch(setIsLocationPopUpDisplayed(false))
        }
    }, [storedCoords]);

    const onSubmitOrder = () => {

    }

    return(
        <section className="checkout">
            <div className="checkout_container container">
                <div className="checkout_info">
                    <div className="checkout_map">
                        <Map coords={coords}/>
                    </div>
                    <div className="checkout_personal_info">
                        <p className="checkout_personal_info_title">Customer data</p>
                        <CustomerInfo onSubmitOrder={onSubmitOrder}/>
                    </div>
                </div>
                <div className="checkout_order">
                    <Order />
                    <Delivery />
                </div>
            </div>
        </section>
    )
}