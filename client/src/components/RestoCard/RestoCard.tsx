import './RestoCard.scss';
import {IRestaurant} from "../../interfaces/restaurantInterfaces.ts";
import {Icon} from "../Icons/Icon.tsx";

interface RestoCardProps{
    restaurantData: IRestaurant
}

export const RestoCard = ({restaurantData}: RestoCardProps) => {
    return(
        <div className="card">
            <div className="card-photo-body">
                <img src={`http://localhost:3001/media/restaurants/${restaurantData.imagePath}`}
                     className="card-photo"
                     alt="Restaurant Food"
                />
                <p className="card-category">{restaurantData.type}</p>
            </div>
            <div className="card-info">
                <p className="card-title">{restaurantData.name}</p>
                <div className="card-rating">
                    <Icon id={"emoji"} width={"24"} height={"24"} stroke={"#006A4E"} />
                    <p>{restaurantData.ranking}%</p>
                </div>
            </div>
        </div>
    )

}