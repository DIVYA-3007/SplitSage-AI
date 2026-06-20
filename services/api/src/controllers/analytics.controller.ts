import { Request, Response } from "express";
import { getAnalytics } from "../services/analytics.service";

export async function analytics(
  req: Request,
  res: Response
) {
  try {
    const { groupId } = req.params;

    const data = await getAnalytics(groupId);

    return res.json({
      success: true,
      analytics: data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}