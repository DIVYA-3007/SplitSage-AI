import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { exportPDF } from "../controllers/export.controller";

const router = Router();

router.get(
  "/:groupId",
  authMiddleware,
  exportPDF
);

export default router;