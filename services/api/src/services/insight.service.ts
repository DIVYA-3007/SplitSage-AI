import prisma from "../prisma/client";

export async function getAIInsight(groupId: string) {
  const expenses = await prisma.expense.findMany({
    where: {
      groupId,
    },
    include: {
      paidBy: true,
    },
  });

  if (expenses.length === 0) {
    return {
      totalExpense: 0,
      highestExpense: 0,
      averageExpense: 0,
      topCategory: "None",
      topSpender: "None",
      insights: [
        "No expenses found.",
        "Start adding expenses.",
        "AI recommendations will appear here.",
      ],
    };
  }

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const highestExpense = Math.max(
    ...expenses.map((e) => e.amount)
  );

  const averageExpense =
    totalExpense / expenses.length;

  const categoryMap: Record<string, number> = {};

  expenses.forEach((expense) => {
    categoryMap[expense.category] =
      (categoryMap[expense.category] || 0) +
      expense.amount;
  });

  const topCategory = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])[0][0];

  const spenderMap: Record<string, number> = {};

  expenses.forEach((expense) => {
    const name =
      expense.paidBy.name ||
      expense.paidBy.email;

    spenderMap[name] =
      (spenderMap[name] || 0) +
      expense.amount;
  });

  const topSpender = Object.entries(spenderMap)
    .sort((a, b) => b[1] - a[1])[0][0];

  const insights = [
    `Total spending is ₹${totalExpense}.`,
    `${Math.round(
      (categoryMap[topCategory] / totalExpense) * 100
    )}% of spending is on ${topCategory}.`,
    `${topSpender} spent the highest amount.`,
    `Average expense is ₹${averageExpense.toFixed(
      2
    )}.`,
    `Try reducing ${topCategory} expenses to save money.`,
  ];

  return {
    totalExpense,
    highestExpense,
    averageExpense,
    topCategory,
    topSpender,
    insights,
  };
}