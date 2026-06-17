import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getDashboardAnalytics } from "../services/dashboardAnalytics.service";

export const analytics = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const data =
      await getDashboardAnalytics(
        req.user!.id
      );

    return res.json({
      success: true,
      ...data,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};