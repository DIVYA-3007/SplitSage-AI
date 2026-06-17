import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { insights } from "../controllers/ai.controller";

const router = Router();

router.get(
  "/insights",
  authMiddleware,
  insights
);

export default router;