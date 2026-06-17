import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  extractReceiptData,
  saveReceiptExpense,
} from "../services/receipt.service";

import { createNotification } from "../services/notification.service";

// =====================================
// Scan Receipt
// =====================================

export const scanReceipt = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Receipt image required",
      });
    }

    if (!req.body.groupId) {
      return res.status(400).json({
        success: false,
        message: "groupId required",
      });
    }

    const receipt =
      await extractReceiptData(
        req.file.path
      );

    const expense =
      await saveReceiptExpense(
        req.body.groupId,
        req.user!.id,
        receipt.amount,
        receipt.description,
        receipt.category
      );

    await createNotification(
      req.user!.id,
      "Receipt Scanned",
      `Receipt scanned successfully. ₹${receipt.amount} extracted by AI.`,
      "receipt"
    );

    return res.status(201).json({
      success: true,
      receipt,
      expense,
    });
  } catch (err: any) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================
// Manual Save Receipt
// =====================================

export const saveReceipt = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      groupId,
      amount,
      description,
      category,
    } = req.body;

    const expense =
      await saveReceiptExpense(
        groupId,
        req.user!.id,
        Number(amount),
        description,
        category
      );

    await createNotification(
      req.user!.id,
      "Receipt Saved",
      `Receipt "${description}" saved successfully.`,
      "receipt"
    );

    return res.status(201).json({
      success: true,
      expense,
    });
  } catch (err: any) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};