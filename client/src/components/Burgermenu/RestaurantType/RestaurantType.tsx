import './RestaurantType.scss';
import {useEffect, useState} from "react";
import axiosInstance from "../../../../axiosConfig.ts";
import {IRestaurantType} from "../../../interfaces/restaurantInterfaces.ts";
import {Link} from "react-router-dom";
import {ArrowDown} from "../../Icons/ArrowDown.tsx";

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
            axiosInstance.get('/restaurantNames', {params: {id: type.id}})
                .then((res) => setRestaurantsNames(res.data))
        }
    }, [isTypesOpen]);

    return (
        <>
            <div className="restaurant-type" onClick={toggleRestaurants}>
                <p className="restaurant-type-name">{type.name}</p>
                <ArrowDown isOptionsOpen={isTypesOpen}/>
            </div>
            {isTypesOpen &&
                <div className="restaurant-type-restaurant-names">
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