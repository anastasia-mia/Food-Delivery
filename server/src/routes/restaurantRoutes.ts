import { Router } from 'express';
import {getAllRestaurants} from "../controllers/restaurantController";

const router = Router();

router.get('/restaurants', getAllRestaurants);

export default router;