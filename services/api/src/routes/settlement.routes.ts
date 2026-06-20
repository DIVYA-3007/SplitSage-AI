import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

import {
  paySettlement,
  settlementHistory,
  getSettlement,
} from "../controllers/settlement.controller";

const router = Router();

// ======================================
// Mark Settlement Paid
// ======================================

router.post(
  "/pay",
  authMiddleware,
  paySettlement
);

// ======================================
// Settlement History
// ======================================
router.get(
  "/:groupId",
  authMiddleware,
  getSettlement
);
router.get(
  "/history/:groupId",
  authMiddleware,
  settlementHistory
);

export default router;