import { Router } from 'express';
import {getAllMenuCategories, getAllItemsByCategory, getAllMenuItems} from '../controllers/menuController';

const router = Router();

router.get('/categories/:restaurantId', getAllMenuCategories);
router.get('/:restaurantId/:category', getAllItemsByCategory);
router.get('/:restaurantId', getAllMenuItems);

export default router;