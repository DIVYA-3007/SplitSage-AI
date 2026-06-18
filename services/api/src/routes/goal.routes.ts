import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  getGoalAnalytics,
} from "../controllers/goal.controller";

const router = Router();

// =====================================
// Create Goal
// =====================================

router.post(
  "/",
  authMiddleware,
  createGoal
);

// =====================================
// Get All Goals
// =====================================

router.get(
  "/",
  authMiddleware,
  getGoals
);

// =====================================
// Goal Analytics
// IMPORTANT: Keep this before /:id
// =====================================

router.get(
  "/analytics",
  authMiddleware,
  getGoalAnalytics
);

// =====================================
// Update Goal
// =====================================

router.put(
  "/:id",
  authMiddleware,
  updateGoal
);

// =====================================
// Delete Goal
// =====================================

router.delete(
  "/:id",
  authMiddleware,
  deleteGoal
);

export default router;