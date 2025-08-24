import { Router } from 'express';
import { login,registerUser } from '../controllers/user.controller.js';

const router = Router();

router.post('/login', login);
router.post('/register', registerUser);

export default router;
