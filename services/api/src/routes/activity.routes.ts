import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  getActivities,
} from "../controllers/activity.controller";

const router = Router();

// All activities
router.get(
  "/",
  authMiddleware,
  getActivities
);

// Group activities
router.get(
  "/:groupId",
  authMiddleware,
  getActivities
);

export default router;