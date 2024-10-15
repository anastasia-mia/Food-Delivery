import sprite from "../../assets/icons/sprite.svg";
import "./HomePage.scss"
import {RestoCard} from "../../components/RestoCard/RestoCard.tsx";
import {useEffect, useState} from "react";
import {IRestaurant} from "../../interfaces/interfaces.ts";
import axios from "axios";
import {Link} from "react-router-dom";


export const HomePage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/restaurants/ranking/8")
            .then((res) => setRestaurants(res.data));
        axios.get("http://localhost:3001/api/categories")
            .then((res) => setCategories(res.data));
    }, [])

    return(
        <div>
            <main className="wrapper">
                <section className="restaurants">
                    <div className="container">
                        <p className="restaurants_title">
                            <svg width="32" height="32">
                                <use
                                    href={sprite + "#rocket"}
                                    fill="none"
                                    stroke="#006A4E"
                                ></use>
                            </svg>
                            Restaurants that you may like
                        </p>
                        <div className="restaurants_group">
                            {restaurants.map((restaurant: IRestaurant) => (
                                <Link key={restaurant.id}
                                      to={`/restaurants/${restaurant.name}`}
                                >
                                    <RestoCard restaurantData={restaurant}/>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="categories">
                    <div className="container">
                        <p className="categories_title">Favorite categories</p>
                        <div className="categories_group">
                            {categories.map((category: string, index: number) => (
                                <div key={index} className="categories_category">{category}</div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}