import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  createGoalService,
  getGoalsService,
  updateGoalService,
  deleteGoalService,
  getGoalAnalyticsService,
} from "../services/goal.service";

// ======================================
// Create Goal
// ======================================

export const createGoal = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const goal = await createGoalService(
      req.user!.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      goal,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// Get All Goals
// ======================================

export const getGoals = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const goals = await getGoalsService(
      req.user!.id
    );

    return res.status(200).json({
      success: true,
      goals,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// Update Goal
// ======================================

export const updateGoal = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const goal =
      await updateGoalService(
        id,
        req.body
      );

    return res.status(200).json({
      success: true,
      goal,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// Delete Goal
// ======================================

export const deleteGoal = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await deleteGoalService(id);

    return res.status(200).json({
      success: true,
      message:
        "Goal deleted successfully",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// Goal Analytics
// ======================================

export const getGoalAnalytics =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const analytics =
        await getGoalAnalyticsService(
          req.user!.id
        );

      return res.status(200).json({
        success: true,
        ...analytics,
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };