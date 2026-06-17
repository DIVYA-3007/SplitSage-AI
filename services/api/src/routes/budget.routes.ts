import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  createBudget,
  getBudget,
  getBudgetSummary,
} from "../controllers/budget.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createBudget
);

router.get(
  "/",
  authMiddleware,
  getBudget
);

router.get(
  "/summary",
  authMiddleware,
  getBudgetSummary
);

export default router;