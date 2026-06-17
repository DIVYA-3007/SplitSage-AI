import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import { calculateSettlements } from "../services/settlement.service";
import { createNotification } from "../services/notification.service";

// =====================================
// Get Smart Settlements
// =====================================

export const getSettlements = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId = req.params.groupId as string;

    console.log("SETTLEMENT ROUTE HIT");
    console.log(groupId);

    const result = await calculateSettlements(
      groupId
    );

    await createNotification(
      req.user!.id,
      "Settlement Generated",
      "Smart settlement calculated successfully.",
      "settlement"
    );

    return res.status(200).json({
      success: true,
      total: result.total,
      memberCount: result.memberCount,
      share: result.share,
      balances: result.balances,
      settlements: result.settlements,
    });
  } catch (err: any) {
    console.error("Settlement Error:", err);

    return res.status(400).json({
      success: false,
      message:
        err.message ||
        "Failed to calculate settlements",
    });
  }
};