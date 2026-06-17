import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";
import {
  scanReceipt,
  saveReceipt,
} from "../controllers/receipt.controller";

const router = Router();

// OCR + AI + Auto Save
router.post(
  "/scan",
  authMiddleware,
  upload.single("receipt"),
  scanReceipt
);

// Manual Save
router.post(
  "/save",
  authMiddleware,
  saveReceipt
);

export default router;