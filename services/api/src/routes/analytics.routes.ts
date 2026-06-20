import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { analytics } from "../controllers/analytics.controller";

const router = Router();

router.get(
  "/:groupId",
  authMiddleware,
  analytics
);

export default router;