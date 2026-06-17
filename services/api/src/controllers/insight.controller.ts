
import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import { getAIInsight } from "../services/insight.service";

export const insight = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId = req.params.groupId as string;

    const data = await getAIInsight(groupId);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err: any) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
