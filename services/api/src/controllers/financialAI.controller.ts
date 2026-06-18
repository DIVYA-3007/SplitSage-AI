import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import { getFinancialAIResponseService } from "../services/financialAI.service";

// ======================================
// Financial AI Assistant
// ======================================

export const askFinancialAI = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const result =
      await getFinancialAIResponseService(
        req.user!.id,
        question
      );

    return res.status(200).json({
      success: true,

      question,

      answer: result.answer,

      score: result.score,

      budget: result.budget,

      spent: result.spent,

      budgetUsage: result.budgetUsage,

      budgetHealth: result.budgetHealth,

      totalSubscription:
        result.totalSubscription,

      totalSaved:
        result.totalSaved,

      totalTarget:
        result.totalTarget,

      topCategory:
        result.topCategory,

      suggestions:
        result.suggestions,
    });
  } catch (err: any) {
    console.error(
      "Financial AI Error:",
      err
    );

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Financial AI failed",
    });
  }
};