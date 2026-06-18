import prisma from "../prisma/client";

// =====================================
// Financial AI Service
// =====================================

export async function getFinancialAIResponseService(
  userId: string,
  question: string
) {
  // ==========================
  // Fetch User Budget
  // ==========================

  const budget = await prisma.budget.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // ==========================
  // Fetch Expenses
  // ==========================

  const expenses = await prisma.expense.findMany({
    where: {
      paidById: userId,
    },
  });

  // ==========================
  // Fetch Goals
  // ==========================

  const goals = await prisma.goal.findMany({
    where: {
      userId,
    },
  });

  // ==========================
  // Fetch Subscriptions
  // ==========================

  const subscriptions =
    await prisma.subscription.findMany({
      where: {
        userId,
        isActive: true,
      },
    });

  // ==========================
  // Total Expense
  // ==========================

  const totalExpense =
    expenses.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  // ==========================
  // Total Subscription
  // ==========================

  const totalSubscription =
    subscriptions.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  // ==========================
  // Total Goal Saving
  // ==========================

  const totalSaved =
    goals.reduce(
      (sum, item) =>
        sum + item.savedAmount,
      0
    );

  const totalTarget =
    goals.reduce(
      (sum, item) =>
        sum + item.targetAmount,
      0
    );

  // ==========================
  // Largest Expense Category
  // ==========================

  const categoryMap: Record<
    string,
    number
  > = {};

  expenses.forEach((expense) => {
    categoryMap[
      expense.category
    ] =
      (categoryMap[
        expense.category
      ] || 0) + expense.amount;
  });

  let topCategory = "None";
  let topAmount = 0;

  Object.entries(
    categoryMap
  ).forEach(([key, value]) => {
    if (value > topAmount) {
      topCategory = key;
      topAmount = value;
    }
  });

  // ==========================
  // Budget Health
  // ==========================

  let budgetHealth =
    "No Budget";

  let budgetPercent = 0;

  if (budget) {
    budgetPercent =
      (totalExpense /
        budget.amount) *
      100;

    if (budgetPercent < 50) {
      budgetHealth =
        "Excellent";
    } else if (
      budgetPercent < 75
    ) {
      budgetHealth =
        "Healthy";
    } else if (
      budgetPercent < 95
    ) {
      budgetHealth =
        "Warning";
    } else {
      budgetHealth =
        "Critical";
    }
  }

  // ==========================
  // Financial Score
  // ==========================

  let score = 100;

  score -= Math.min(
    budgetPercent * 0.5,
    50
  );

  score -= Math.min(
    subscriptions.length * 2,
    20
  );

  if (
    totalTarget > 0
  ) {
    score += Math.min(
      (totalSaved /
        totalTarget) *
        20,
      20
    );
  }

  score = Math.max(
    0,
    Math.min(
      100,
      Math.round(score)
    )
  );

  // ==========================
  // Smart Suggestions
  // ==========================

  const suggestions: string[] =
    [];

  if (budgetPercent > 90) {
    suggestions.push(
      "⚠️ You are close to exceeding your monthly budget."
    );
  }

  if (
    subscriptions.length > 5
  ) {
    suggestions.push(
      "💳 Review recurring subscriptions to reduce unnecessary expenses."
    );
  }

  if (
    totalSaved <
    totalTarget * 0.4
  ) {
    suggestions.push(
      "🎯 Increase monthly savings to reach your goals sooner."
    );
  }

  if (
    topCategory !== "None"
  ) {
    suggestions.push(
      `📊 Your highest spending category is ${topCategory}.`
    );
  }

  if (
    suggestions.length === 0
  ) {
    suggestions.push(
      "✅ Your finances are in good shape. Keep maintaining your current habits."
    );
  }

  // ==========================
  // AI Answer
  // ==========================

  const answer = `
Financial Analysis

Question:
${question}

Budget:
₹${budget?.amount ?? 0}

Spent:
₹${totalExpense}

Budget Usage:
${budgetPercent.toFixed(1)}%

Budget Health:
${budgetHealth}

Subscriptions:
₹${totalSubscription}

Goals Saved:
₹${totalSaved}

Goal Target:
₹${totalTarget}

Top Spending Category:
${topCategory}

Financial Health Score:
${score}/100

Recommendations:

${suggestions.join("\n")}
`;

  return {
    score,
    budget: budget?.amount ?? 0,
    spent: totalExpense,
    budgetUsage:
      Number(
        budgetPercent.toFixed(2)
      ),
    budgetHealth,
    totalSubscription,
    totalSaved,
    totalTarget,
    topCategory,
    suggestions,
    answer,
  };
}