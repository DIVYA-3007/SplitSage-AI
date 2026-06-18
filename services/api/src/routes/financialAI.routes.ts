import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  askFinancialAI,
} from "../controllers/financialAI.controller";

const router = Router();

// ======================================
// Ask Financial AI
// ======================================

router.post(
  "/",
  authMiddleware,
  askFinancialAI
);

export default router;