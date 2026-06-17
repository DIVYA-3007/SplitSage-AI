import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

import {
  create,
  getGroups,
  inviteMember,
  getGroup,
} from "../controllers/group.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  create
);

router.get(
  "/",
  authMiddleware,
  getGroups
);

router.get(
  "/:groupId",
  authMiddleware,
  getGroup
);

router.post(
  "/:groupId/members",
  authMiddleware,
  inviteMember
);

router.post(
  "/:groupId/invite",
  authMiddleware,
  inviteMember
);

export default router;