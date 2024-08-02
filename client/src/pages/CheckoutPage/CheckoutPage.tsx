import './CheckoutPage.scss';
import {Order} from "./Order/Order.tsx";

export const CheckoutPage = () => {

    return(
        <section className="checkout">
            <div className="checkout_container container">
                <div className="checkout_info">
                    <div className="checkout_map"></div>
                    <div className="checkout_personal_info"></div>
                </div>
                <div className="checkout_order">
                    <Order />
                </div>
            </div>
        </section>
    )
}