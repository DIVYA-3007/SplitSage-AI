import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  notifications,
  readNotification,
  readAllNotifications,
} from "../controllers/notification.controller";

const router = Router();

router.get(
  "/",
  authMiddleware,
  notifications
);

router.patch(
  "/:id/read",
  authMiddleware,
  readNotification
);

router.patch(
  "/read-all",
  authMiddleware,
  readAllNotifications
);

export default router;