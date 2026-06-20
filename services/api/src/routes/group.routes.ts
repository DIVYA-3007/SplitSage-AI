import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  create,
  getGroups,
  inviteMember,
  getGroup,
} from "../controllers/group.controller";

const router = Router();

// ===========================
// Create Group
// ===========================

router.post(
  "/",
  authMiddleware,
  create
);

// ===========================
// Get My Groups
// ===========================

router.get(
  "/",
  authMiddleware,
  getGroups
);

// ===========================
// Get Group Details
// ===========================

router.get(
  "/:groupId",
  authMiddleware,
  getGroup
);

// ===========================
// Invite Member (Admin Only)
// ===========================

router.post(
  "/:groupId/invite",
  authMiddleware,
  inviteMember
);

export default router;