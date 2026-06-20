import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { calculateSettlements } from "../services/settlement.service";
import {
  markSettlementPaid,
  getSettlementHistory,
} from "../services/settlementPayment.service";

// ======================================
// Mark Settlement Paid
// ======================================

export const paySettlement = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const payment =
      await markSettlementPaid({
        fromUserId: req.body.fromUserId,
        toUserId: req.body.toUserId,
        groupId: req.body.groupId,
        amount: Number(req.body.amount),
        note: req.body.note,
      });

    return res.json({
      success: true,
      payment,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// Settlement History
// ======================================

export const settlementHistory =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const groupId = Array.isArray(req.params.groupId)
  ? req.params.groupId[0]
  : req.params.groupId;

const history =
  await getSettlementHistory(groupId);

      return res.json({
        success: true,
        history,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
  export const getSettlement = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const data =
      await calculateSettlements(
        req.params.groupId as string
      );

    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};