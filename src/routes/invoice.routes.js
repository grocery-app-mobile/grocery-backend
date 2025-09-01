import { Router } from 'express';
import invoiceController from '../controllers/invoice.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/createInvoice", authMiddleware, invoiceController.createInvoice);
router.get("/getInvoiceById/:id", authMiddleware, invoiceController.getInvoiceById);
router.patch("/updateInvoice/:id/pay", authMiddleware, invoiceController.markasPaid);
router.get("/getInvoices", authMiddleware, invoiceController.getInvoices);

export default router;
