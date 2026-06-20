import prisma from "../prisma/client";

export async function getAnalytics(groupId: string) {
  const expenses = await prisma.expense.findMany({
    where: {
      groupId,
    },
    include: {
      paidBy: true,
    },
  });

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const totalTransactions = expenses.length;

  const categoryMap: Record<string, number> = {};

  const memberMap: Record<string, number> = {};

  const monthlyMap: Record<string, number> = {};

  expenses.forEach((expense) => {
    // Category

    categoryMap[expense.category] =
      (categoryMap[expense.category] || 0) +
      expense.amount;

    // Member

    const member =
      expense.paidBy.name ||
      expense.paidBy.email ||
      "Unknown";

    memberMap[member] =
      (memberMap[member] || 0) +
      expense.amount;

    // Month

    const month =
      new Date(expense.createdAt)
        .toLocaleString("default", {
          month: "short",
        });

    monthlyMap[month] =
      (monthlyMap[month] || 0) +
      expense.amount;
  });

  return {
    totalExpense,

    totalTransactions,

    categories:
      Object.entries(categoryMap).map(
        ([name, value]) => ({
          name,
          value,
        })
      ),

    members:
      Object.entries(memberMap).map(
        ([name, value]) => ({
          name,
          value,
        })
      ),

    monthly:
      Object.entries(monthlyMap).map(
        ([month, value]) => ({
          month,
          value,
        })
      ),
  };
}