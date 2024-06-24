import {getAll} from "../queries/restaurantQueries";
import {IRestaurant} from "../models/RestaurantModel";
import{Response} from 'express';

const getAllRestaurants = async(_, res: Response) => {
    try{
        const restaurants: IRestaurant[] = await getAll()
        res.json(restaurants)
    }catch{
        res.status(500).send("Error getting all restaurants")
    }
}

export {getAllRestaurants}