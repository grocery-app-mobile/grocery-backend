import { Router } from 'express';
import productController from '../controllers/product.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('', authMiddleware,productController.create);
router.get('', authMiddleware,productController.list);
router.get('/:id', authMiddleware,productController.findById);
router.put('/:id', authMiddleware,productController.update);
router.delete('/:id', authMiddleware,productController.remove);

export default router;
