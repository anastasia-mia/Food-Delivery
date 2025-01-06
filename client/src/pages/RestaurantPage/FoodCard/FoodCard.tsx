import './FoodCard.scss';
import {IMenuItem} from "../../../interfaces/cartInterfaces.ts";
import {useDispatch, useSelector} from "react-redux";
import {addItem} from '../../../redux/cartSlice.ts'
import {AppDispatch, RootState} from "../../../redux/store.ts";
import {useMemo} from "react";

interface FoodCardProps {
    menuItem: IMenuItem;
}

export const FoodCard= ({menuItem}: FoodCardProps) => {
    const {id} = useSelector((state: RootState) => state.currentRestaurant);
    const dispatch: AppDispatch = useDispatch();
    const restaurant = useSelector((state: RootState) => state.chosenRestaurant);

    const isRestaurantAvailable: boolean = useMemo(() => {
        return Number(id) === restaurant.restaurant_id;
    }, [id, restaurant.restaurant_id]);

    const addToCart = () => {
        if(isRestaurantAvailable){
            dispatch(addItem({
                id: menuItem.id,
                quantity: 1,
                name: menuItem.name,
                price: menuItem.price,
            }));
        }
    }

    return(
        <div className="food-card">
            <div className="food-card-container">
                <div className="food-card-top">
                    <div className="food-card-image"></div>
                    <div className="food-card-details">
                        <p className="food-card-name">{menuItem.name}</p>
                        <p className="food-card-description">{menuItem.description}</p>
                    </div>
                </div>
                <div className="food-card-bottom">
                    <span className="food-card-price">{menuItem.price}€</span>
                    <div className={`${isRestaurantAvailable ? 'food-card-buy' : "food-card-buy-unavailable"}`}
                         onClick={addToCart}>
                        <span>+</span>
                    </div>
                </div>
            </div>
        </div>
    )
}