import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

import {
  createSubscription,
  getSubscriptions,
  updateSubscription,
  deleteSubscription,
} from "../controllers/subscription.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createSubscription
);

router.get(
  "/",
  authMiddleware,
  getSubscriptions
);

router.put(
  "/:id",
  authMiddleware,
  updateSubscription
);

router.delete(
  "/:id",
  authMiddleware,
  deleteSubscription
);

export default router;