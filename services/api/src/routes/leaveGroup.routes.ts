import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { leave } from "../controllers/leaveGroup.controller";

const router = Router();

router.delete(
  "/:groupId/leave",
  authMiddleware,
  leave
);

export default router;