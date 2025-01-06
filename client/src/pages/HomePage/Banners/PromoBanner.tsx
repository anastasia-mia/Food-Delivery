import './Banners.scss';
import CouponImg from '/assets/coupon.png';

export const PromoBanner = () => {

    return(
        <div className="banner banner-brown">
            <div className="banner-text">
                <h2>Unlock Delicious Deals! </h2>
                <p>Use Promo Code <span> "DELIVERY2024" </span> for 20% Off Your Order!</p>
            </div>
            <div className="banner-photo">
                <img src={CouponImg} alt="promocode"/>
            </div>
        </div>
    )
}