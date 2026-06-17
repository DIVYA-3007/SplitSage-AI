
import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  getReceiptHistory,
} from "../controllers/receiptHistory.controller";

const router = Router();

router.get(
  "/",
  authMiddleware,
  getReceiptHistory
);

export default router;
