import {getAll, getById, getByLimitAndSorting, getAllCategories} from "../queries/restaurantQueries";
import {IRestaurant} from "../models/RestaurantModel";
import{Response, Request} from 'express';

const getAllRestaurants = async(_, res: Response) => {
    try{
        const restaurants: IRestaurant[] = await getAll();
        res.json(restaurants);
    }catch{
        res.status(500).send("Error getting all restaurants");
    }
}

const getRestaurantById = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const restaurant: IRestaurant = await getById(id);
        res.json(restaurant);
    }catch{
        res.status(500).send("Error getting Restaurant");
    }

}

const getLimitedAndSortedRestaurants = async(req: Request , res: Response) => {
    try{
        const {column, limit} = req.params;
        const numericLimit = parseInt(limit, 10);

        const restaurants: IRestaurant[] = await getByLimitAndSorting(column, numericLimit);
        res.json(restaurants);
    }catch(err){
        res.status(500).send("Error getting restaurants");
    }
}

const getAllCategoriesFromDB = async(req: Request, res: Response) => {
    try{
        const categories: string[]= await getAllCategories();
        res.json(categories);
    }catch{
        res.status(500).send("Error getting all categories");
    }
}

export {getAllRestaurants, getRestaurantById, getLimitedAndSortedRestaurants, getAllCategoriesFromDB}