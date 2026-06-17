import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  overview,
  analytics,
  monthlyExpenses,
} from "../controllers/dashboard.controller";

const router = Router();

router.get(
  "/overview",
  authMiddleware,
  overview
);

router.get(
  "/analytics/:groupId",
  authMiddleware,
  analytics
);

router.get(
  "/monthly/:groupId",
  authMiddleware,
  monthlyExpenses
);

export default router;