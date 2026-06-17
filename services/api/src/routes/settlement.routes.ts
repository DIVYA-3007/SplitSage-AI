import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getSettlements } from "../controllers/settlement.controller";

const router = Router();

router.get(
  "/:groupId",
  authMiddleware,
  getSettlements
);

export default router;