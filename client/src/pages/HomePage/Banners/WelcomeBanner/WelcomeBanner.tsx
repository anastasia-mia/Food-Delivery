import './WelcomeBanner.scss';
import DeliveryImage from '../../../../assets/delivery.jpg'

export const WelcomeBanner = () => {

    return(
        <div className="banner">
            <div className="banner_text">
                <h2>Welcome to Our Delivery App!</h2>
                <p>Order food from your favorite restaurants in just a few clicks!</p>
            </div>
            <div className="banner_photo">
                <img src={DeliveryImage} alt="deliver"/>
            </div>
        </div>
    )
}