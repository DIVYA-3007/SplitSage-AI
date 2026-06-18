import prisma from "../prisma/client";

export async function getDashboardAnalytics(
  userId: string
) {
  // =====================================
  // Fetch Data
  // =====================================

  const [
    expenses,
    groups,
    budgets,
  ] = await Promise.all([
    prisma.expense.findMany({
      where: {
        paidById: userId,
      },
      orderBy: {
        createdAt: "asc",
      },
    }),

    prisma.groupMember.findMany({
      where: {
        userId,
      },
    }),

    prisma.budget.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    }),
  ]);

  // =====================================
  // Expense Summary
  // =====================================

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const expenseCount = expenses.length;

  const groupCount = groups.length;

  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map(
            (expense) => expense.amount
          )
        )
      : 0;

  // =====================================
  // Category Analytics
  // =====================================

  const categoryMap: Record<
    string,
    number
  > = {};

  expenses.forEach((expense) => {
    categoryMap[expense.category] =
      (categoryMap[
        expense.category
      ] || 0) + expense.amount;
  });

  const categoryData =
    Object.entries(categoryMap).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

  let topCategory = "None";

  let maxCategoryAmount = 0;

  Object.entries(categoryMap).forEach(
    ([category, amount]) => {
      if (amount > maxCategoryAmount) {
        maxCategoryAmount = amount;

        topCategory = category;
      }
    }
  );

  // =====================================
  // Monthly Expense Analytics
  // =====================================

  const monthlyMap: Record<
    string,
    number
  > = {};

  expenses.forEach((expense) => {
    const month =
      expense.createdAt.toLocaleString(
        "default",
        {
          month: "short",
        }
      );

    monthlyMap[month] =
      (monthlyMap[month] || 0) +
      expense.amount;
  });

  const monthlyData =
    Object.entries(monthlyMap).map(
      ([month, amount]) => ({
        month,
        amount,
      })
    );

  // =====================================
  // Budget Analytics
  // =====================================

  const currentBudget =
    budgets.length > 0
      ? budgets[0]
      : null;

  const budget =
    currentBudget?.amount || 0;

  const budgetSpent =
    totalSpent;

  const remainingBudget =
    Math.max(
      budget - budgetSpent,
      0
    );

  const budgetPercentage =
    budget > 0
      ? Number(
          (
            (budgetSpent /
              budget) *
            100
          ).toFixed(2)
        )
      : 0;

  let budgetHealth =
    "Healthy";

  if (
    budgetPercentage >= 95
  ) {
    budgetHealth =
      "Critical";
  } else if (
    budgetPercentage >= 80
  ) {
    budgetHealth =
      "Warning";
  } else if (
    budgetPercentage >= 60
  ) {
    budgetHealth =
      "Moderate";
  }
    // =====================================
  // Goals Analytics
  // =====================================

  const goals =
    await prisma.goal.findMany({
      where: {
        userId,
      },
    });

  const totalGoals =
    goals.length;

  const goalSaved =
    goals.reduce(
      (sum, goal) =>
        sum + goal.savedAmount,
      0
    );

  const goalTarget =
    goals.reduce(
      (sum, goal) =>
        sum + goal.targetAmount,
      0
    );

  const goalProgress =
    goalTarget > 0
      ? Number(
          (
            (goalSaved /
              goalTarget) *
            100
          ).toFixed(2)
        )
      : 0;

  const activeGoals =
    goals.filter(
      (goal) =>
        goal.savedAmount <
        goal.targetAmount
    ).length;

  const completedGoals =
    goals.filter(
      (goal) =>
        goal.savedAmount >=
        goal.targetAmount
    ).length;

  // =====================================
  // Subscription Analytics
  // =====================================

  const subscriptions =
    await prisma.subscription.findMany({
      where: {
        userId,
        isActive: true,
      },
    });

  const totalSubscriptions =
    subscriptions.length;

  const totalSubscriptionCost =
    subscriptions.reduce(
      (sum, subscription) =>
        sum + subscription.amount,
      0
    );

  const upcomingSubscriptions =
    subscriptions
      .sort(
        (a, b) =>
          a.nextDueDate.getTime() -
          b.nextDueDate.getTime()
      )
      .slice(0, 5);

  // =====================================
  // Savings Rate
  // =====================================

  const totalIncomeEstimate =
    budget || totalSpent;

  const savingsRate =
    totalIncomeEstimate > 0
      ? Number(
          (
            (remainingBudget /
              totalIncomeEstimate) *
            100
          ).toFixed(2)
        )
      : 0;

  // =====================================
  // AI Financial Score
  // =====================================

  let aiScore = 100;

  // Budget Usage

  if (
    budgetPercentage > 95
  ) {
    aiScore -= 30;
  } else if (
    budgetPercentage > 80
  ) {
    aiScore -= 20;
  } else if (
    budgetPercentage > 60
  ) {
    aiScore -= 10;
  }

  // Goal Progress

  if (
    goalProgress < 25
  ) {
    aiScore -= 20;
  } else if (
    goalProgress < 50
  ) {
    aiScore -= 10;
  }

  // Subscription Load

  if (
    totalSubscriptionCost >
    5000
  ) {
    aiScore -= 10;
  }

  // Expense Count

  if (
    expenseCount > 50
  ) {
    aiScore -= 5;
  }

  aiScore = Math.max(
    0,
    Math.min(
      100,
      aiScore
    )
  );

  // =====================================
  // Financial Health
  // =====================================

  let financialHealth =
    "Excellent";

  if (
    aiScore < 40
  ) {
    financialHealth =
      "Poor";
  } else if (
    aiScore < 60
  ) {
    financialHealth =
      "Average";
  } else if (
    aiScore < 80
  ) {
    financialHealth =
      "Good";
  }

  // =====================================
  // Forecast Estimate
  // =====================================

  const forecast =
    Math.round(
      totalSpent * 1.08
    );
      // =====================================
  // Recent Activities
  // =====================================

  const recentActivities =
    await prisma.activity.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

  // =====================================
  // Notifications
  // =====================================

  const unreadNotifications =
    await prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });

  // =====================================
  // Average Expense
  // =====================================

  const averageExpense =
    expenseCount > 0
      ? Number(
          (
            totalSpent /
            expenseCount
          ).toFixed(2)
        )
      : 0;

  // =====================================
  // Last Expense
  // =====================================

  const lastExpense =
    expenses.length > 0
      ? expenses[
          expenses.length - 1
        ]
      : null;

  // =====================================
  // Return Analytics
  // =====================================

  return {
    // Expense

    totalSpent,

    expenseCount,

    highestExpense,

    averageExpense,

    lastExpense,

    // Groups

    groupCount,

    // Budget

    budget,

    budgetSpent,

    remainingBudget,

    budgetPercentage,

    budgetHealth,

    // Goals

    totalGoals,

    goalSaved,

    goalTarget,

    goalProgress,

    activeGoals,

    completedGoals,

    // Subscriptions

    totalSubscriptions,

    totalSubscriptionCost,

    upcomingSubscriptions,

    // AI

    aiScore,

    financialHealth,

    savingsRate,

    forecast,

    // Charts

    topCategory,

    monthlyData,

    categoryData,

    // Activity

    recentActivities,

    // Notifications

    unreadNotifications,
  };
}