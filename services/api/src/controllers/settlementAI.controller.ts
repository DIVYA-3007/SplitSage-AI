import { Request, Response } from "express";

import {
  calculateSettlement,
} from "../services/settlementAI.service";

export async function settlement(
  req: Request,
  res: Response
) {
  try {
    const data =
      await calculateSettlement(
        req.params.groupId as string
      );

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}