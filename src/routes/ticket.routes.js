import { Router } from 'express';
import ticketController from '../controllers/ticket.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/createTicket", authMiddleware, ticketController.createTicket);
router.get("/getTickets", authMiddleware, ticketController.getTickets);
router.put("/updateTicket/:id", authMiddleware, ticketController.updateTicket);
router.get("/getTicketById/:id", authMiddleware, ticketController.getTicketById);
router.delete("/deleteTicket/:id", authMiddleware, ticketController.deleteTicket);

export default router;
