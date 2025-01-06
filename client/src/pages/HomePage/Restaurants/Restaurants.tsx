import './Restaurants.scss';
import {IRestaurant} from "../../../interfaces/restaurantInterfaces.ts";
import {Link} from "react-router-dom";
import {RestoCard} from "../../../components/RestoCard/RestoCard.tsx";
import {useEffect, useState} from "react";
import axiosInstance from "../../../../axiosConfig.ts";
import {Icon} from "../../../components/Icons/Icon.tsx";

export const Restaurants = () => {
    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
    const [restaurantsAmount, setRestaurantsAmount] = useState<number>(0)
    const [limit, setLimit] = useState<number | null>(null);
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        window.innerWidth > 768 ? setLimit(7) : setLimit(5);
    }, []);

    useEffect(() => {
        if (limit && offset === restaurants.length) {
            axiosInstance.get("/sortedRestaurants", {params: {limit, offset}})
                .then((res) => {
                        setRestaurants((prevState) => [...prevState, ...res.data.restaurants]);
                        setRestaurantsAmount(res.data.restaurantsAmount)
                    }
                );
        }
    }, [limit, offset]);

    const handleMoreRestaurants = () => {
        if(offset + (limit as number) > restaurantsAmount) return;
        setOffset((prevState) => prevState + (limit as number));
    }

    return (
        <section className="restaurants">
            <p className="restaurants-title">
                <Icon id={"rocket"} width={"32"} height={"32"} stroke={"#006A4E"} />
                Restaurants that you may like
            </p>
            <div className="restaurants-group">
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