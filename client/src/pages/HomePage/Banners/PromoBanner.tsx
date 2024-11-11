import './Banners.scss';
import CouponImg from '/assets/coupon.png';

export const PromoBanner = () => {

    return(
        <div className="banner banner_brown">
            <div className="banner_text">
                <h2>Unlock Delicious Deals! </h2>
                <p>Use Promo Code <span> "DELIVERY2024" </span> for 20% Off Your Order!</p>
            </div>
            <div className="banner_photo">
                <img src={CouponImg} alt="promocode"/>
            </div>
        </div>
    )
}