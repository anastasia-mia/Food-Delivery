import {getAll, getById, getByLimitAndSorting, getAllCategories, getIdByName} from "../queries/restaurantQueries";
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

const getRestaurantIdByName = async(req: Request, res: Response) => {
    try{
        const {name} = req.params;
        const restaurantId: number = await getIdByName(name);
        res.json(restaurantId);
    } catch{
        res.status(500).send("Error getting restaurant id");
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
        const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : 8;
        const offset = typeof req.query.offset === 'string' ? parseInt(req.query.offset, 10) : 0;

        const restaurantsByLimit: IRestaurant[] = await getByLimitAndSorting(limit, offset);
        const restaurants: IRestaurant[] = await getAll();
        res.json({restaurants: restaurantsByLimit, restaurantsAmount: restaurants.length});
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

export {getAllRestaurants,
    getRestaurantById,
    getLimitedAndSortedRestaurants,
    getRestaurantIdByName,
    getAllCategoriesFromDB
}