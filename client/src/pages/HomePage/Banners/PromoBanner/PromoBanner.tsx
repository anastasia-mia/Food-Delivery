import './PromoBanner.scss';
import PromocodeImage from "../../../../../public/assets/promocode.jpg";

export const PromoBanner = () => {

    return(
        <div className="promo_banner">
            <div className="banner_text">
                <h2>Unlock Delicious Deals! </h2>
                <p>Use Promo Code ‘DELIVERY2024’ for 20% Off Your Order!</p>
            </div>
            <div className="promo-banner_photo">
                <img src={PromocodeImage} alt="promocode"/>
            </div>
        </div>
    )
}