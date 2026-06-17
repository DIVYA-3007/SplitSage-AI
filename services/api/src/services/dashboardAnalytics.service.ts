import prisma from "../prisma/client";

export async function getDashboardAnalytics(userId: string) {
  const expenses = await prisma.expense.findMany({
    where: {
      paidById: userId,
    },
  });

  const groupCount = await prisma.groupMember.count({
    where: {
      userId,
    },
  });

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const expenseCount = expenses.length;

  const highestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((e) => e.amount))
      : 0;

  const categoryMap: Record<string, number> = {};

  expenses.forEach((expense) => {
    categoryMap[expense.category] =
      (categoryMap[expense.category] || 0) +
      expense.amount;
  });

  let topCategory = "None";

  let max = 0;

  Object.entries(categoryMap).forEach(
    ([category, amount]) => {
      if (amount > max) {
        max = amount;
        topCategory = category;
      }
    }
  );

  const monthlyMap: Record<string, number> = {};

  expenses.forEach((expense) => {
    const month = expense.createdAt.toLocaleString(
      "default",
      {
        month: "short",
      }
    );

    monthlyMap[month] =
      (monthlyMap[month] || 0) +
      expense.amount;
  });

  const monthlyData = Object.entries(monthlyMap).map(
    ([month, amount]) => ({
      month,
      amount,
    })
  );

  return {
    totalSpent,
    expenseCount,
    groupCount,
    highestExpense,
    topCategory,
    monthlyData,
    categoryData: Object.entries(categoryMap).map(
      ([name, value]) => ({
        name,
        value,
      })
    ),
  };
}