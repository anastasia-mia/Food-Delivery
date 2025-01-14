import './Banners.scss';
import DeliveryMan from '/assets/delivery-man.png';

export const WelcomeBanner = () => {

    return(
        <div className="banner banner-green">
            <div className="banner-text">
                <h2>Welcome to Our Delivery App!</h2>
                <p>Order food from your favorite restaurants in just a few clicks!</p>
            </div>
            <div className="banner-photo">
                <img src={DeliveryMan} alt="deliveryMan"/>
            </div>
        </div>
    )
}