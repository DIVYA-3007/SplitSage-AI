import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  profile,
} from "../controllers/profile.controller";

const router = Router();

router.get(
  "/",
  authMiddleware,
  profile
);

export default router;