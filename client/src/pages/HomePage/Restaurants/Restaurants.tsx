import sprite from "/assets/icons/sprite.svg";
import {IRestaurant} from "../../../interfaces/interfaces.ts";
import {Link} from "react-router-dom";
import {RestoCard} from "../../../components/RestoCard/RestoCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import useWindowWidth from "../../../hooks/useWindowWidth.ts";

export const Restaurants = () => {
    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
    const [restaurantsAmount, setRestaurantsAmount] = useState<number>(0)
    const [limit, setLimit] = useState<number | null>(null);
    const [offset, setOffset] = useState<number>(0);
    const [requestCount, setRequestCount] = useState<number>(0);
    const windowWidth: number = useWindowWidth();

    useEffect(() => {
        windowWidth > 768 ? setLimit(7) : setLimit(5);
    }, [windowWidth]);

    useEffect(() => {
        console.log(limit, offset)
        if (limit && requestCount === restaurants.length / limit) {
            axios.get("http://localhost:3001/api/sortedRestaurants", {params: {limit, offset}})
                .then((res) => {
                        setRestaurants((prevState) => [...prevState, ...res.data.restaurants]);
                        setRestaurantsAmount(res.data.restaurantsAmount)
                    }
                ).finally(() => setRequestCount(prevState => prevState + 1));
        }
    }, [limit, offset]);

    const handleMoreRestaurants = () => {
        if(offset + (limit as number) > restaurantsAmount) return;
        setOffset((prevState) => prevState + (limit as number));
    }

    return (
        <section className="restaurants">
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
                {restaurantsAmount > restaurants.length &&
                    <button onClick={handleMoreRestaurants}>
                        Get more restaurants
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 17L11 12L6 7M13 17L18 12L13 7" stroke="black" strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </button>
                }
            </div>
        </section>
    )
}