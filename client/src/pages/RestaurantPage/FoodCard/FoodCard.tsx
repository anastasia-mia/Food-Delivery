import './FoodCard.scss';
import {IMenuItem} from "../../../interfaces/interfaces.ts";
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
        <div className="food_card">
            <div className="food_card_container">
                <div className="food_card_top">
                    <div className="food_card_image"></div>
                    <div className="food_card_details">
                        <p className="food_card_name">{menuItem.name}</p>
                        <p className="food_card_description">{menuItem.description}</p>
                    </div>
                </div>
                <div className="food_card_bottom">
                    <span className="food_card_price">{menuItem.price}€</span>
                    <div className={`${isRestaurantAvailable ? 'food_card_buy' : "food_card_buy_unavailable"}`}
                         onClick={addToCart}>
                        <span>+</span>
                    </div>
                </div>
            </div>
        </div>
    )
}