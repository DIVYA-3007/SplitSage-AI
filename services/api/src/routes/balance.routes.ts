import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { getBalances } from "../controllers/balance.controller";

const router = Router();

/*
GET
/api/groups/:groupId/balances
*/

router.get(
  "/:groupId/balances",
  authMiddleware,
  getBalances
);

export default router;