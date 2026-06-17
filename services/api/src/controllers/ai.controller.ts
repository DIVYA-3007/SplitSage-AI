import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../prisma/client";

import {
  getAIInsights,
  generateGroupInsight,
} from "../services/ai.service";

// =====================================
// Personal Insights
// =====================================

export const insights = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId = req.query.groupId as string;

    if (groupId) {
      const result =
        await generateGroupInsight(groupId);

      return res.json({
        success: true,
        insights: result,
      });
    }

    const expenses = await prisma.expense.findMany({
      where: {
        paidById: req.user!.id,
      },
    });

    const totalSpent = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const totalExpenses = expenses.length;

    const result = await getAIInsights(
      totalSpent,
      totalExpenses
    );

    return res.json({
      success: true,
      insights: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};