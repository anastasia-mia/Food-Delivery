import { Router } from 'express';
import {
    getAllRestaurants,
    getRestaurantById,
    getLimitedAndSortedRestaurants,
    getAllCategoriesFromDB, getRestaurantIdByName,
} from "../controllers/restaurantController";

const router = Router();

router.get('/restaurants', getAllRestaurants);
router.get('/restaurants/name/:name', getRestaurantIdByName)
router.get('/restaurants/id/:id', getRestaurantById);
router.get('/restaurants/:column/:limit', getLimitedAndSortedRestaurants);
router.get('/categories', getAllCategoriesFromDB);

export default router;