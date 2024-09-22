import { Router } from 'express';
import {checkSession, createNewUser, loginUser} from '../controllers/userController';

const router = Router();

router.post('/register', createNewUser);
router.post('/login', loginUser)
router.get('/checkSession', checkSession)

export default router;