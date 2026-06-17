import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import { insight } from "../controllers/insight.controller";

const router = Router();

router.get(
  "/:groupId",
  authMiddleware,
  insight
);

export default router;