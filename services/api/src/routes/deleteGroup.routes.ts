import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { removeGroup } from "../controllers/deleteGroup.controller";

const router = Router();

// =====================================
// Delete Group (Admin Only)
// =====================================

router.delete(
  "/:groupId",
  authMiddleware,
  removeGroup
);

export default router;