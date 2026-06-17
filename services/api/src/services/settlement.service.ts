import prisma from "../prisma/client";

export async function calculateSettlements(
  groupId: string
) {
  const members = await prisma.groupMember.findMany({
    where: {
      groupId,
    },
    include: {
      user: true,
    },
  });

  if (members.length === 0) {
    throw new Error("No members found");
  }

  const expenses = await prisma.expense.findMany({
    where: {
      groupId,
    },
    include: {
      paidBy: true,
    },
  });

  // ==========================
  // Total Expense
  // ==========================

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // ==========================
  // Equal Share
  // ==========================

  const share =
    members.length > 0
      ? total / members.length
      : 0;

  // ==========================
  // Calculate Balances
  // ==========================

  const balances: Record<
    string,
    {
      name: string;
      balance: number;
    }
  > = {};

  members.forEach((member) => {
    balances[member.userId] = {
      name:
        member.user.name ||
        member.user.email ||
        "Unknown",
      balance: -share,
    };
  });

  expenses.forEach((expense) => {
    if (balances[expense.paidById]) {
      balances[expense.paidById].balance +=
        expense.amount;
    }
  });

  // ==========================
  // Creditors & Debtors
  // ==========================

  const creditors: {
    userId: string;
    name: string;
    amount: number;
  }[] = [];

  const debtors: {
    userId: string;
    name: string;
    amount: number;
  }[] = [];

  Object.entries(balances).forEach(
    ([userId, value]) => {
      if (value.balance > 0.01) {
        creditors.push({
          userId,
          name: value.name,
          amount: value.balance,
        });
      } else if (value.balance < -0.01) {
        debtors.push({
          userId,
          name: value.name,
          amount: -value.balance,
        });
      }
    }
  );

  // ==========================
  // Sort Largest First
  // ==========================

  creditors.sort(
    (a, b) => b.amount - a.amount
  );

  debtors.sort(
    (a, b) => b.amount - a.amount
  );

  // ==========================
  // Debt Simplification
  // ==========================

  const settlements: {
    from: string;
    to: string;
    amount: number;
  }[] = [];

  let i = 0;
  let j = 0;

  while (
    i < debtors.length &&
    j < creditors.length
  ) {
    const payment = Math.min(
      debtors[i].amount,
      creditors[j].amount
    );

    settlements.push({
      from: debtors[i].name,
      to: creditors[j].name,
      amount: Number(payment.toFixed(2)),
    });

    debtors[i].amount -= payment;
    creditors[j].amount -= payment;

    if (debtors[i].amount <= 0.01) {
      i++;
    }

    if (creditors[j].amount <= 0.01) {
      j++;
    }
  }

  // ==========================
  // Return Result
  // ==========================

  return {
  total,
  memberCount: members.length,
  share,
  balances: Object.values(balances),
  settlements,
};
}