import "./RestaurantPage.scss"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import sprite from "../../../public/assets/icons/sprite.svg";
import {Cart} from "./Cart/Cart.tsx";
import {Categories} from "./Categories/Categories.tsx";
import {MenuBody} from "./MenuBody/MenuBody.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store.ts";
import {fetchRestaurant, fetchRestaurantId} from "../../redux/currentRestaurantSlice.ts";

export const RestaurantPage = () => {
    const {restaurantName} = useParams();
    const [category, setCategory] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();
    const {id, loading, restaurant} = useSelector((state: RootState) => state.currentRestaurant);

    useEffect(() => {
        dispatch(fetchRestaurantId({name: restaurantName as string}))
    }, [])

    useEffect(() => {
        dispatch(fetchRestaurant())
    }, [id])

    return(
        <section className="restaurant">
            <div className="container restaurant_container">
                <div className="restaurant_card">
                    <p className="restaurant_name">{restaurant?.name}</p>
                    <p className="restaurant_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis dolorem esse obcaecati veritatis? Accusantium adipisci deleniti enim eum facere, illum nam, nemo, optio praesentium quam quis recusandae tenetur voluptatum. Eaque!</p>
                    <div className="restaurant_details">
                        <div className="details_group">
                            <svg width="32" height="32">
                                <use
                                    href={sprite + "#clock"}
                                    fill="none"
                                    stroke="#006A4E"
                                ></use>
                            </svg>
                            <span>{restaurant?.delivery_time_from}-{restaurant?.delivery_time_to}′</span>
                        </div>
                        <div className="details_group">
                            <svg width="32" height="32">
                                <use
                                    href={sprite + "#truck"}
                                    fill="none"
                                    stroke="#006A4E"
                                ></use>
                            </svg>
                            <span>{restaurant?.delivery_price_from}-{restaurant?.delivery_price_to}€</span>
                        </div>
                        <div className="details_group">
                            <svg width="32" height="32">
                                <use
                                    href={sprite + "#emoji"}
                                    fill="none"
                                    stroke="#006A4E"
                                ></use>
                            </svg>
                            <span>{restaurant?.ranking}%</span>
                        </div>
                    </div>
                </div>
                {loading ? (
                    <p className="restaurant_loading">Loading restaurant items ...</p>
                ) : (
                    <>
                        <Categories setCategory={setCategory}/>
                        <MenuBody category={category}/>
                    </>
                )}
                <Cart />
            </div>
        </section>
    )
}