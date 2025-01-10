import './Card.scss';
import {IRestaurant} from "../../../interfaces/restaurantInterfaces.ts";
import {Icon} from "../../../components/Icons/Icon.tsx";

export const Card = ({restaurant}: {restaurant: IRestaurant}) => {

    return (
        <div className="restaurant-card">
            <p className="restaurant-name">{restaurant?.name}</p>
            <p className="restaurant-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis dolorem
                                           esse obcaecati veritatis? Accusantium adipisci deleniti enim eum facere,
                                           illum nam, nemo, optio praesentium quam quis recusandae tenetur voluptatum.
                                           Eaque!</p>
            <div className="restaurant-details">
                <div className="details-group">
                    <Icon id="clock" width="32" height="32" />
                    <span>{restaurant?.deliveryTimeFrom}-{restaurant?.deliveryTimeTo}′</span>
                </div>
                <div className="details-group">
                    <Icon id="truck" width="32" height="32" stroke="#006A4E" />
                    <span>{restaurant?.deliveryPriceFrom}-{restaurant?.deliveryPriceTo}€</span>
                </div>
                <div className="details-group">
                    <Icon id="emoji" width="32" height="32" />
                    <span>{restaurant?.ranking}%</span>
                </div>
            </div>
        </div>
    )
}