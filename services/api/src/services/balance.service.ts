import prisma from "../prisma/client";

export async function getGroupBalances(
  groupId: string
) {
  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },

    include: {
      members: {
        include: {
          user: true,
        },
      },

      expenses: {
        include: {
          paidBy: true,
        },
      },
    },
  });

  if (!group) {
    throw new Error("Group not found");
  }

  const balances: Record<
    string,
    {
      userId: string;
      name: string;
      balance: number;
    }
  > = {};

  // Initialize balances

  for (const member of group.members) {
    balances[member.user.id] = {
      userId: member.user.id,
      name: member.user.name || "User",
      balance: 0,
    };
  }

  // Calculate balances

  for (const expense of group.expenses) {
    const memberCount = group.members.length;

    if (memberCount === 0) continue;

    const share =
      expense.amount / memberCount;

    // Person who paid gets credit

    balances[
      expense.paidBy.id
    ].balance += expense.amount;

    // Everyone owes equal share

    for (const member of group.members) {
      balances[
        member.user.id
      ].balance -= share;
    }
  }

  // Preserve original balances

  const result = Object.values(
    balances
  ).map((item) => ({
    ...item,
    balance: Number(
      item.balance.toFixed(2)
    ),
  }));

  // Use copies for settlement calculation

  const debtors = result
    .filter((u) => u.balance < 0)
    .map((u) => ({
      ...u,
    }));

  const creditors = result
    .filter((u) => u.balance > 0)
    .map((u) => ({
      ...u,
    }));

  const settlements: {
    from: string;
    to: string;
    amount: number;
  }[] = [];

  for (const debtor of debtors) {
    let debt = Math.abs(
      debtor.balance
    );

    for (const creditor of creditors) {
      if (debt <= 0) break;

      if (creditor.balance <= 0)
        continue;

      const amount = Math.min(
        debt,
        creditor.balance
      );

      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: Number(
          amount.toFixed(2)
        ),
      });

      debt -= amount;

      creditor.balance -= amount;
    }
  }

  return {
    success: true,
    balances: result,
    settlements,
  };
}