import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import customerController from '../controllers/customer.controller.js';

const router = Router();

router.post('/uploadKYC', authMiddleware, customerController.uploadKYC);
router.post('/wallet/transaction', authMiddleware, customerController.walletTransactions);

export default router;
