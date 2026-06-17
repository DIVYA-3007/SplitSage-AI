import prisma from "../prisma/client";

export async function getForecast(
  userId: string
) {
  const expenses =
    await prisma.expense.findMany({
      where: {
        paidById: userId,
      },
    });

  const now = new Date();

  const currentMonth =
    now.getMonth();

  const currentYear =
    now.getFullYear();

  const monthExpenses =
    expenses.filter((expense) => {
      const date = new Date(
        expense.createdAt
      );

      return (
        date.getMonth() ===
          currentMonth &&
        date.getFullYear() ===
          currentYear
      );
    });

  const currentSpent =
    monthExpenses.reduce(
      (sum, expense) =>
        sum + expense.amount,
      0
    );

  const today =
    now.getDate();

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const averageDaily =
    today === 0
      ? 0
      : Number(
          (
            currentSpent / today
          ).toFixed(2)
        );

  const predicted =
    Math.round(
      averageDaily * daysInMonth
    );

  let suggestion =
    "Your spending looks healthy.";

  if (
    predicted >
    currentSpent * 1.3
  ) {
    suggestion =
      "Your expenses are increasing rapidly. Try reducing unnecessary spending.";
  }

  return {
    currentSpent,
    averageDaily,
    predicted,
    daysPassed: today,
    daysInMonth,
    suggestion,
  };
}