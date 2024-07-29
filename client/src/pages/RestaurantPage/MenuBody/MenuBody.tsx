import {FoodCard} from "../FoodCard/FoodCard.tsx";
import './MenuBody.scss';

export const MenuBody = () => {

    return(
        <div className="menu_body">
            <FoodCard />
            <FoodCard />
            <FoodCard />
        </div>
    )
}