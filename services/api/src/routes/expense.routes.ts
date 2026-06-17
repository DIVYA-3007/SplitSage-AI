import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  askExpenseChat,
  createExpenseWithParticipants,
} from "../controllers/expense.controller";

const router = Router();

// ===========================
// AI Expense Chat
// ===========================

router.post(
  "/ask-ai",
  authMiddleware,
  askExpenseChat
);

// ===========================
// Create Expense
// ===========================

router.post(
  "/participants",
  authMiddleware,
  createExpenseWithParticipants
);

router.post(
  "/",
  authMiddleware,
  createExpense
);

// ===========================
// Get Expenses by Group
// ===========================

router.get(
  "/:groupId",
  authMiddleware,
  getExpenses
);

// ===========================
// Update Expense
// ===========================

router.put(
  "/:expenseId",
  authMiddleware,
  updateExpense
);

// ===========================
// Delete Expense
// ===========================

router.delete(
  "/:expenseId",
  authMiddleware,
  deleteExpense
);

export default router;