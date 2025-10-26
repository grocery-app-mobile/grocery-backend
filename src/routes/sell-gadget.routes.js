import { Router } from 'express';
import gadgetController from '../controllers/gadget.contoller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.get("/getPriceEstimate", authMiddleware, gadgetController.getPriceEstimate);
router.post("/sellProduct", authMiddleware, gadgetController.sellProduct);
router.get("/getSellGadgets", authMiddleware, gadgetController.getSellGadgets);
router.get("/trackOrders/:id", authMiddleware, gadgetController.getTrackOrders);

export default router;
