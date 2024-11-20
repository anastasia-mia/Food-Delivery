import './Card.scss';
import {IRestaurant} from "../../../interfaces/interfaces.ts";
import {Icon} from "../../../components/Icon/Icon.tsx";

export const Card = ({restaurant}: {restaurant: IRestaurant}) => {

    return (
        <div className="restaurant_card">
            <p className="restaurant_name">{restaurant?.name}</p>
            <p className="restaurant_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis dolorem
                                           esse obcaecati veritatis? Accusantium adipisci deleniti enim eum facere,
                                           illum nam, nemo, optio praesentium quam quis recusandae tenetur voluptatum.
                                           Eaque!</p>
            <div className="restaurant_details">
                <div className="details_group">
                    <Icon id="clock" width="32" height="32" />
                    <span>{restaurant?.delivery_time_from}-{restaurant?.delivery_time_to}′</span>
                </div>
                <div className="details_group">
                    <Icon id="truck" width="32" height="32" stroke="#006A4E" />
                    <span>{restaurant?.delivery_price_from}-{restaurant?.delivery_price_to}€</span>
                </div>
                <div className="details_group">
                    <Icon id="emoji" width="32" height="32" />
                    <span>{restaurant?.ranking}%</span>
                </div>
            </div>
        </div>
    )
}