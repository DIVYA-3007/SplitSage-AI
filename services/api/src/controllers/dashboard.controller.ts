import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  getAnalytics,
  getMonthlyExpenses,
  getOverview,
} from "../services/dashboard.service";

// =====================================
// Dashboard Overview
// =====================================

export const overview = async (
  req: AuthRequest,
  res: Response
) => {
  console.log("OVERVIEW ROUTE HIT");

  try {
    console.log("USER =", req.user);

    const data = await getOverview(
      req.user!.id
    );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err: any) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Failed to load dashboard overview",
    });
  }
};

// =====================================
// Dashboard Analytics
// =====================================

export const analytics = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId =
      req.params.groupId as string;

    const analytics =
      await getAnalytics(groupId);

    return res.status(200).json({
      success: true,
      analytics,
    });
  } catch (err: any) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Failed to load analytics",
    });
  }
};

// =====================================
// Monthly Expenses
// =====================================

export const monthlyExpenses = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId =
      req.params.groupId as string;

    const monthly =
      await getMonthlyExpenses(
        groupId
      );

    return res.status(200).json({
      success: true,
      monthly,
    });
  } catch (err: any) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Failed to load monthly expenses",
    });
  }
};