import './RestaurantType.scss';
import {useEffect, useState} from "react";
import axios from "axios";
import {IRestaurantType} from "../../../interfaces/restaurantInterfaces.ts";
import {Link} from "react-router-dom";
import {ArrowDown} from "../../Icon/ArrowDown.tsx";

interface RestaurantTypeProps {
    type: IRestaurantType
}

export const RestaurantType = ({type}: RestaurantTypeProps) => {
    const [isTypesOpen, setIsTypesOpen] = useState<boolean>(false);
    const [restaurantsNames, setRestaurantsNames] = useState<string[]>([])

    const toggleRestaurants = () => {
        setIsTypesOpen(!isTypesOpen);
    }

    useEffect(() => {
        if (isTypesOpen) {
            axios.get('http://localhost:3001/api/restaurantNames', {params: {id: type.id}})
                .then((res) => setRestaurantsNames(res.data))
        }
    }, [isTypesOpen]);

    return (
        <>
            <div className="restaurant_type" onClick={toggleRestaurants}>
                <p className="restaurant_type_name">{type.name}</p>
                <ArrowDown isOptionsOpen={isTypesOpen}/>
            </div>
            {isTypesOpen &&
                <div className="restaurant_type_restaurant_names">
                    {restaurantsNames.map((name, index) => (
                        <Link key={index}
                              to={`/restaurants/${name}`}
                        >{name}</Link>
                    ))}
                </div>
            }
        </>
    )
}