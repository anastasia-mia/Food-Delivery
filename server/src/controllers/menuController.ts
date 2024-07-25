import {getAllCategories, getAllByCategory, getAllItems} from "../queries/menuQueries";
import{Response, Request} from 'express';
import {IMenuItem} from "../models/menuModel";

const getAllMenuItems = async (req: Request, res: Response) => {
    try{
        const restaurantId: number = parseInt(req.params.restaurantId,10);
        const menuItems: IMenuItem[] = await getAllItems(restaurantId)
        res.json(menuItems);
    }catch{
        res.status(500).send("Error getting all items");
    }
}

const getAllItemsByCategory = async (req: Request, res: Response) => {
    try{
        const restaurantId: number = parseInt(req.params.restaurantId,10);
        const category: string = req.params.category;
        const menuItems: IMenuItem[] = await getAllByCategory(restaurantId, category)
        res.json(menuItems);
    }catch{
        res.status(500).send("Error getting all items");
    }
}

const getAllMenuCategories = async (req: Request, res: Response) => {
    try{
        const restaurantId: number = parseInt(req.query.restaurantId as string,10);
        if (isNaN(restaurantId)) {
            return res.status(400).send("Invalid restaurant ID");
        }
        const categories: string[]= await getAllCategories(restaurantId);
        res.json(categories);
    }catch{
        res.status(500).send("Error getting all categories");
    }
}

export { getAllItemsByCategory, getAllMenuCategories, getAllMenuItems};