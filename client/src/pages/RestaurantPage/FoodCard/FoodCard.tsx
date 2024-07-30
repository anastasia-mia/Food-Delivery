import './FoodCard.scss';
import {IMenuItem} from "../../../models/interfaces/interfaces.ts";
import {useDispatch} from "react-redux";
import {addItem} from '../../../redux/cartSlice.ts'
import {AppDispatch} from "../../../redux/store.ts";

interface FoodCardProps {
    menuItem: IMenuItem;
}

export const FoodCard= ({menuItem}: FoodCardProps) => {
    const dispatch: AppDispatch = useDispatch();

    const addToCart = () => {
        dispatch(addItem({id: menuItem.id, quantity: 1}));
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
                    <div className="food_card_buy" onClick={addToCart}><span>+</span></div>
                </div>
            </div>
        </div>
    )
}