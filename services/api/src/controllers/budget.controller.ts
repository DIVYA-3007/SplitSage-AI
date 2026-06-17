import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";

import {
  createBudgetService,
  getBudgetService,
  getBudgetSummaryService,
} from "../services/budget.service";

export const createBudget = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const budget =
      await createBudgetService(
        req.user!.id,
        req.body.amount
      );

    return res.json({
      success: true,
      budget,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getBudget = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const budget =
      await getBudgetService(
        req.user!.id
      );

    return res.json({
      success: true,
      budget,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getBudgetSummary =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const summary =
        await getBudgetSummaryService(
          req.user!.id
        );

      return res.json({
        success: true,
        ...summary,
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };