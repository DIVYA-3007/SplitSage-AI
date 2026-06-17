import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  forecast,
} from "../controllers/forecast.controller";

const router = Router();

router.get(
  "/",
  authMiddleware,
  forecast
);

export default router;