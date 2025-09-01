import { Router } from 'express';
import appointmentController from '../controllers/appointment.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/createAppointment", authMiddleware, appointmentController.createAppointment);
router.get("/getAppointments", authMiddleware, appointmentController.getAppointments);

export default router;
