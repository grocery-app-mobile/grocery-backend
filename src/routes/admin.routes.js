import { Router } from 'express';
import { login } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import adminUserController from '../controllers/admin/admin-user.controller.js';
import adminController from '../controllers/admin/repair.controller.js';

const router = Router();

router.post('/login', login);

router.post("/user/create", authMiddleware, adminUserController.create);
router.get("/user/findById/:id", authMiddleware, adminUserController.findById);
router.put("/user/update/:id", authMiddleware, adminUserController.update);
router.delete("/user/delete/:id", authMiddleware, adminUserController.remove);
router.get("/user/all", authMiddleware, adminUserController.getAllUsers);

router.get("/repair-orders/all", authMiddleware, adminController.getAllRepairOrders);
router.put("/repair-orders/update/:id", authMiddleware, adminController.updateRepairOrders);
router.get("/repair-orders/findById/:id", authMiddleware, adminController.getRepairOrderById);
router.delete("/repair-orders/delete/:id", authMiddleware, adminController.deleteRepairOrder);

router.get("/racks/all", authMiddleware, adminController.getAllRacks);
router.put("/racks/update/:id", authMiddleware, adminController.updateRacks);
router.get("/racks/findById/:id", authMiddleware, adminController.getRackById);
router.post("/racks/create", authMiddleware, adminController.createRacks);

router.get("/support-tickets/all", authMiddleware, adminController.getAllSupportTickets);
router.put("/support-tickets/update/:id", authMiddleware, adminController.updateSupportTickets);
router.get("/support-tickets/findById/:id", authMiddleware, adminController.getSupportById);

export default router;
