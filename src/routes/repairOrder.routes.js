import { Router } from 'express';
import repairOrderController from '../controllers/repairOrder.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/createRepairOrder", authMiddleware, repairOrderController.createRepairOrder);
router.get("/getRepairOrders", authMiddleware, repairOrderController.getRepairOrders);
router.put("/updateRepairOrder/:id", authMiddleware, repairOrderController.updateRepairOrder);

export default router;
