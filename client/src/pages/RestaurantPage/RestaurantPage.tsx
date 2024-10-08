import "./RestaurantPage.scss"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {IRestaurant} from "../../interfaces/interfaces.ts";
import sprite from "../../assets/icons/sprite.svg";
import {Cart} from "./Cart/Cart.tsx";
import {Categories} from "./Categories/Categories.tsx";
import {MenuBody} from "./MenuBody/MenuBody.tsx";

export const RestaurantPage = () => {
    const {id} = useParams();
    const [restaurant, setRestaurant] = useState<IRestaurant>({
        id: 0,
        name: '',
        delivery_price_from: 0,
        delivery_price_to: 0,
        delivery_time_from: 0,
        delivery_time_to: 0,
        ranking: 0,
        category: ''
    });
    const [category, setCategory] = useState<string>('');

    useEffect(() => {
        axios.get(`http://localhost:3001/api/restaurants/${id}`)
            .then((res) => setRestaurant(res.data))
    }, [])

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
                <Categories setCategory={setCategory}/>
                <MenuBody category={category}/>
                <Cart restaurantName={restaurant.name} restaurant_id={Number(id)}/>
            </div>
        </section>
    )
}