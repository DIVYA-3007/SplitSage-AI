import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { remove } from "../controllers/removeMember.controller";

const router = Router();

router.delete(
  "/:groupId/member/:userId",
  authMiddleware,
  remove
);

export default router;