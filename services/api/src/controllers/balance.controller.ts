import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import { getGroupBalances } from "../services/balance.service";

export const getBalances = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId = String(req.params.groupId);

    const data = await getGroupBalances(
      groupId
    );

    return res.status(200).json({
      success: true,
      balances: data.balances,
      settlements: data.settlements,
    });
  } catch (err: any) {
    console.error(err);

    return res.status(400).json({
      success: false,
      message:
        err.message ||
        "Failed to fetch group balances.",
    });
  }
};