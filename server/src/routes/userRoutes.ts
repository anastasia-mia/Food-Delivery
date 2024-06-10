import { Router } from 'express';
import {createNewUser, loginUser} from '../controllers/userController';

const router = Router();

router.post('/register', createNewUser);
router.post('/login', loginUser)

export default router;