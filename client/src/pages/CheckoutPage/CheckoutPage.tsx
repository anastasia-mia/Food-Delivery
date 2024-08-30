import './CheckoutPage.scss';
import {Order} from "./Order/Order.tsx";
import MapComponent from "./Map/Map.tsx";
import useStoredCoords from "../../hooks/useStoredCoords.ts";

export const CheckoutPage = () => {
    const storedCoords = useStoredCoords();

    return(
        <section className="checkout">
            <div className="checkout_container container">
                <div className="checkout_info">
                    <div className="checkout_map">
                        <MapComponent coords={storedCoords}/>
                    </div>
                    <div className="checkout_personal_info"></div>
                </div>
                <div className="checkout_order">
                    <Order />
                </div>
            </div>
        </section>
    )
}