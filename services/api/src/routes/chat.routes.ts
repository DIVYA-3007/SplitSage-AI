import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

import {
  chat,
  history,
} from "../controllers/chat.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  chat
);

router.get(
  "/history",
  authMiddleware,
  history
);

export default router;