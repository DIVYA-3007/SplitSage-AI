import prisma from "../prisma/client";

// =======================================
// Get User Profile
// =======================================

export async function getProfile(
  userId: string
) {
  // ===========================
  // User Details
  // ===========================

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // ===========================
  // Total Expenses
  // ===========================

  const totalExpenses = await prisma.expense.aggregate({
    where: {
      paidById: userId,
    },

    _sum: {
      amount: true,
    },
  });

  // ===========================
  // Total Groups
  // ===========================

  const totalGroups = await prisma.groupMember.count({
    where: {
      userId,
    },
  });

  // ===========================
  // Total Receipts
  // ===========================

  const totalReceipts = await prisma.receipt.count({
    where: {
      uploadedById: userId,
    },
  });

  // ===========================
  // Recent Activities
  // ===========================

  const activities = await prisma.activity.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 10,
  });

  // ===========================
  // All Expenses
  // ===========================

  const expenses = await prisma.expense.findMany({
    where: {
      paidById: userId,
    },

    select: {
      amount: true,
      category: true,
    },
  });

  // ===========================
  // Average Expense
  // ===========================

  const averageExpense =
    expenses.length > 0
      ? expenses.reduce(
          (sum, item) => sum + item.amount,
          0
        ) / expenses.length
      : 0;

  // ===========================
  // Highest Expense
  // ===========================

  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map(
            (item) => item.amount
          )
        )
      : 0;

  // ===========================
  // Highest Category
  // ===========================

  const categoryMap: Record<
    string,
    number
  > = {};

  expenses.forEach((expense) => {
    const category =
      expense.category || "Other";

    categoryMap[category] =
      (categoryMap[category] || 0) + 1;
  });

  let highestCategory = "None";

  let highestCount = 0;

  Object.entries(categoryMap).forEach(
    ([category, count]) => {
      if (count > highestCount) {
        highestCategory = category;
        highestCount = count;
      }
    }
  );

  // ===========================
  // AI Spending Score
  // ===========================

  const spendingScore = Math.min(
    100,
    Math.max(
      60,
      100 -
        (totalExpenses._sum.amount || 0) /
          5000
    )
  );

  // ===========================
  // Return
  // ===========================

  return {
    user,

    totalExpenses:
      totalExpenses._sum.amount || 0,

    totalGroups,

    totalReceipts,

    activities,

    highestCategory,

    averageExpense: Math.round(
      averageExpense
    ),

    highestExpense,

    totalTransactions:
      expenses.length,

    spendingScore: Math.round(
      spendingScore
    ),
  };
}
