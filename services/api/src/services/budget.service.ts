import prisma from "../prisma/client";

export async function createBudgetService(
  userId: string,
  amount: number
) {
  const now = new Date();

  const month = now.getMonth() + 1;

  const year = now.getFullYear();

  const existing =
    await prisma.budget.findFirst({
      where: {
        userId,
        month,
        year,
      },
    });

  if (existing) {
    return await prisma.budget.update({
      where: {
        id: existing.id,
      },
      data: {
        amount,
      },
    });
  }

  return await prisma.budget.create({
    data: {
      amount,
      month,
      year,
      userId,
    },
  });
}

export async function getBudgetService(
  userId: string
) {
  const now = new Date();

  return await prisma.budget.findFirst({
    where: {
      userId,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
  });
}

export async function getBudgetSummaryService(
  userId: string
) {
  const now = new Date();

  const budget =
    await prisma.budget.findFirst({
      where: {
        userId,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      },
    });

  const expenses =
    await prisma.expense.aggregate({
      where: {
        paidById: userId,
      },
      _sum: {
        amount: true,
      },
    });

  const spent =
    expenses._sum.amount || 0;

  const totalBudget =
    budget?.amount || 0;

  const remaining =
    totalBudget - spent;

  const percentage =
    totalBudget === 0
      ? 0
      : (spent / totalBudget) * 100;

  let status = "Excellent";

  if (percentage >= 100) {
    status = "Budget Exceeded";
  } else if (percentage >= 80) {
    status = "Near Limit";
  } else if (percentage >= 50) {
    status = "Be Careful";
  }

  return {
    budget: totalBudget,
    spent,
    remaining,
    percentage,
    status,
  };
}