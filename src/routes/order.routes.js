import { Router } from 'express';
import orderController from '../controllers/order.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('', authMiddleware,orderController.create);
router.get('', authMiddleware,orderController.list);
router.get('/:id', authMiddleware,orderController.findById);
router.put('/:id', authMiddleware,orderController.update);
router.delete('/:id', authMiddleware,orderController.remove);

export default router;
