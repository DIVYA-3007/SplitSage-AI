import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { analytics } from "../controllers/dashboardAnalytics.controller";

const router = Router();

router.get(
  "/",
  authMiddleware,
  analytics
);

export default router;