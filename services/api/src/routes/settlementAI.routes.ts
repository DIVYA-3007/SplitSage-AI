import { Router } from "express";

import {
  settlement,
} from "../controllers/settlementAI.controller";

const router = Router();

router.get(
  "/:groupId",
  settlement
);

export default router;