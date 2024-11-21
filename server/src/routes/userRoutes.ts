import { Router } from 'express';
import {checkSession, createNewUser, loginUser, logoutUser} from '../controllers/userController';

const router = Router();

router.post('/register', createNewUser);
router.post('/login', loginUser);
router.get('/checkSession', checkSession);
router.post('/logout', logoutUser);

export default router;