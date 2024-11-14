import { Router } from 'express';
import {
    getAllRestaurants,
    getRestaurantById,
    getLimitedAndSortedRestaurants,
    getRestaurantTypes, getRestaurantIdByName, getRestaurantsByType,
} from "../controllers/restaurantController";

const router = Router();

router.get('/restaurants', getAllRestaurants);
router.get('/restaurants/name/:name', getRestaurantIdByName)
router.get('/restaurants/id/:id', getRestaurantById);
router.get('/sortedRestaurants', getLimitedAndSortedRestaurants);
router.get('/categories', getRestaurantTypes);
router.get('/restaurantNames', getRestaurantsByType)

export default router;