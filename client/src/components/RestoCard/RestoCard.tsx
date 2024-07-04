import './RestoCard.scss';
import {IRestaurant} from "../../models/interfaces/interfaces.ts";
import sprite from "../../assets/icons/sprite.svg";

interface RestoCardProps{
    restaurantData: IRestaurant
}

export const RestoCard = ({restaurantData}: RestoCardProps) => {
    return(
        <div className="card">
            <div className="card_photo_body">
                <img src="https://i0.wp.com/www.drdavidludwig.com/wp-content/uploads/2017/01/1-RIS_6IbCLYv1X3bzYW1lmA.jpeg?fit=800%2C552&ssl=1" className="card_photo" alt="Restaurant Food"/>
                <p className="card_category">{restaurantData.category}</p>
            </div>
            <div className="card_info">
                <p className="card_title">{restaurantData.name}</p>
                <div className="card_rating">
                    <svg width="24" height="24">
                        <use
                            href={sprite + "#emoji"}
                            fill="none"
                            stroke="#006A4E"
                        ></use>
                    </svg>
                    <p>{restaurantData.ranking}%</p>
                </div>
            </div>
        </div>
    )

}