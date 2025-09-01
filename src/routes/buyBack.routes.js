import { Router } from 'express';
import buyBackController from '../controllers/buyBack.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/createBuyBack", authMiddleware, buyBackController.createBuyBack);
router.get("/getBuyBack", authMiddleware, buyBackController.getBuyBack);
router.put("/updateBuyBack/:id", authMiddleware, buyBackController.updateBuyBack);
router.patch("/updateBuyBack/:id/quote", authMiddleware, buyBackController.updateQuote);
router.patch("/updateBuyBack/:id/pay", authMiddleware, buyBackController.markasPaid);

export default router;
