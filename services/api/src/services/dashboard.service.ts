import prisma from "../prisma/client";

export async function getOverview(userId: string) {
  console.log("================================");
  console.log("Logged User ID:", userId);

  const allUsers = await prisma.user.findMany();
  console.log("All Users:", allUsers);

  const allExpenses = await prisma.expense.findMany();
  console.log("All Expenses:", allExpenses);

  const allGroups = await prisma.groupMember.findMany();
  console.log("All Group Members:", allGroups);

  const expenses = await prisma.expense.findMany({
    where: {
      paidById: userId,
    },
  });

  console.log("Filtered Expenses:", expenses);

  const groups = await prisma.groupMember.findMany({
    where: {
      userId,
    },
  });

  console.log("Filtered Groups:", groups);

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const highestExpense =
    expenses.length > 0
      ? expenses.reduce((max, expense) =>
          expense.amount > max.amount ? expense : max
        )
      : null;

  const averageExpense =
    expenses.length > 0
      ? totalSpent / expenses.length
      : 0;

  const food = expenses
    .filter((e) => e.category === "Food")
    .reduce((sum, e) => sum + e.amount, 0);

  const travel = expenses
    .filter((e) => e.category === "Travel")
    .reduce((sum, e) => sum + e.amount, 0);

  const shopping = expenses
    .filter((e) => e.category === "Shopping")
    .reduce((sum, e) => sum + e.amount, 0);

  const other = expenses
    .filter((e) => e.category === "Other")
    .reduce((sum, e) => sum + e.amount, 0);

  return {
    totalSpent,
    totalGroups: groups.length,
    totalTransactions: expenses.length,
    averageExpense,
    highestExpense,
    categoryBreakdown: {
      food,
      travel,
      shopping,
      other,
    },
  };
}

export async function getAnalytics(groupId: string) {
  const expenses = await prisma.expense.findMany({
    where: {
      groupId,
    },
  });

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const food = expenses
    .filter((e) => e.category === "Food")
    .reduce((sum, e) => sum + e.amount, 0);

  const travel = expenses
    .filter((e) => e.category === "Travel")
    .reduce((sum, e) => sum + e.amount, 0);

  const shopping = expenses
    .filter((e) => e.category === "Shopping")
    .reduce((sum, e) => sum + e.amount, 0);

  const other = expenses
    .filter((e) => e.category === "Other")
    .reduce((sum, e) => sum + e.amount, 0);

  const highestExpense =
    expenses.length > 0
      ? expenses.reduce((max, expense) =>
          expense.amount > max.amount ? expense : max
        )
      : null;

  const averageExpense =
    expenses.length > 0
      ? totalSpent / expenses.length
      : 0;

  return {
    totalSpent,
    food,
    travel,
    shopping,
    other,
    highestExpense,
    averageExpense,
    expenseCount: expenses.length,
  };
}

export async function getMonthlyExpenses(groupId: string) {
  const expenses = await prisma.expense.findMany({
    where: {
      groupId,
    },
  });

  const monthly: Record<string, number> = {};

  expenses.forEach((expense) => {
    const month = expense.createdAt.toLocaleString(
      "default",
      {
        month: "short",
      }
    );

    monthly[month] =
      (monthly[month] || 0) + expense.amount;
  });

  return monthly;
}