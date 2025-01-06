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
                <img src="https://i0.wp.com/www.drdavidludwig.com/wp-content/uploads/2017/01/1-RIS_6IbCLYv1X3bzYW1lmA.jpeg?fit=800%2C552&ssl=1" className="card-photo" alt="Restaurant Food"/>
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