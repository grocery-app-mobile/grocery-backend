import { Router } from 'express';
import claimController from '../controllers/claim.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/createNewClaim", authMiddleware, claimController.createNewClaim);
router.get("/getClaims", authMiddleware, claimController.getClaims);

export default router;
