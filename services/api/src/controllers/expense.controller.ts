import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  createExpenseService,
  createExpenseWithParticipantsService,
  getExpensesService,
  updateExpenseService,
  deleteExpenseService,
  askExpenseAI,
} from "../services/expense.service";

import { createActivity } from "../services/activity.service";
import { createNotification } from "../services/notification.service";

// ======================================
// Create Expense
// ======================================

export const createExpense = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const expense = await createExpenseService({
      groupId: req.body.groupId,
      paidBy: req.user!.id,
      amount: Number(req.body.amount),
      description: req.body.description,
      category: req.body.category || "Other",
    });

    await createActivity(
      req.user!.id,
      "CREATE_EXPENSE",
      `Added expense "${expense.description}"`,
      expense.groupId
    );

    await createNotification(
      req.user!.id,
      "Expense Added",
      `Expense "${expense.description}" added successfully.`,
      "expense"
    );

    return res.status(201).json({
      success: true,
      expense,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// Create Expense With Participants
// ======================================

export const createExpenseWithParticipants =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const expense =
        await createExpenseWithParticipantsService({
          groupId: req.body.groupId,
          paidBy: req.user!.id,
          amount: Number(req.body.amount),
          description: req.body.description,
          category: req.body.category || "Other",
          participants:
            req.body.participants || [],
        });

      await createActivity(
        req.user!.id,
        "CREATE_EXPENSE",
        `Added expense "${req.body.description}"`,
        req.body.groupId
      );

      await createNotification(
        req.user!.id,
        "Expense Added",
        `Expense "${req.body.description}" added successfully.`,
        "expense"
      );

      return res.status(201).json({
        success: true,
        expense,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

// ======================================
// Get Expenses
// ======================================

export const getExpenses = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId =
      req.params.groupId as string;

    const expenses =
      await getExpensesService(groupId);

    return res.json({
      success: true,
      expenses,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// Update Expense
// ======================================

export const updateExpense = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const expenseId =
      req.params.expenseId as string;

    const expense =
      await updateExpenseService(
        expenseId,
        {
          amount: Number(req.body.amount),
          description: req.body.description,
          category: req.body.category,
        }
      );

    await createActivity(
      req.user!.id,
      "UPDATE_EXPENSE",
      `Updated expense "${expense.description}"`,
      expense.groupId
    );

    await createNotification(
      req.user!.id,
      "Expense Updated",
      `Expense "${expense.description}" updated successfully.`,
      "expense"
    );

    return res.json({
      success: true,
      expense,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// Delete Expense
// ======================================

export const deleteExpense = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const expenseId =
      req.params.expenseId as string;

    const expense =
      await deleteExpenseService(
        expenseId
      );

    await createActivity(
      req.user!.id,
      "DELETE_EXPENSE",
      `Deleted expense "${expense.description}"`,
      expense.groupId
    );

    await createNotification(
      req.user!.id,
      "Expense Deleted",
      `Expense "${expense.description}" deleted successfully.`,
      "expense"
    );

    return res.json({
      success: true,
      message:
        "Expense deleted successfully",
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// AI Expense Chat
// ======================================

export const askExpenseChat = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { groupId, question } =
      req.body;

    if (!groupId || !question) {
      return res.status(400).json({
        success: false,
        message:
          "groupId and question are required",
      });
    }

    const answer =
      await askExpenseAI(
        groupId,
        question
      );

    await createNotification(
      req.user!.id,
      "AI Assistant",
      "You asked AI about your expenses.",
      "ai"
    );

    return res.json({
      success: true,
      answer,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};