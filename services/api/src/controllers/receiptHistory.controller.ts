import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";

import {
  getReceiptHistoryService,
} from "../services/receiptHistory.service";

export const getReceiptHistory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const receipts =
      await getReceiptHistoryService(
        req.user!.id
      );

    return res.json({
      success: true,
      receipts,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};