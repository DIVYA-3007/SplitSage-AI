import { Router } from "express";

import * as inviteController from "../controllers/invite.controller";
import * as auth from "../middleware/auth.middleware";

console.log("inviteController =", inviteController);
console.log("auth =", auth);

const router = Router();

router.post(
  "/groups/:groupId/invite",
  auth.authMiddleware,
  inviteController.invite
);

export default router;