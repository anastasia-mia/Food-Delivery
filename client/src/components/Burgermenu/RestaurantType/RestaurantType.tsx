import './RestaurantType.scss';
import {useEffect, useState} from "react";
import axios from "axios";
import {IRestaurantType} from "../../../interfaces/interfaces.ts";
import {Link} from "react-router-dom";

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
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                     viewBox="0 0 24 24"
                     style={isTypesOpen ? {transform: 'rotate(180deg)'} : {transform: 'rotate(0deg)'}}
                >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="2" d="m19 9-7 7-7-7"/>
                </svg>
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