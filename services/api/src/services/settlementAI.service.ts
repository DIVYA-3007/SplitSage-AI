import prisma from "../prisma/client";

export async function calculateSettlement(
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
          participants: true,
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
      name:
        member.user.name ||
        member.user.email ||
        "User",
      balance: 0,
    };
  }

  // Calculate balances

  for (const expense of group.expenses) {
    balances[expense.paidById].balance +=
      expense.amount;

    if (
      expense.participants.length > 0
    ) {
      for (const participant of expense.participants) {
        balances[
          participant.userId
        ].balance -=
          participant.shareAmount;
      }
    } else {
      const share =
        expense.amount /
        group.members.length;

      for (const member of group.members) {
        balances[
          member.user.id
        ].balance -= share;
      }
    }
  }

  const result =
    Object.values(balances);

  const debtors = result.filter(
    (user) => user.balance < -0.01
  );

  const creditors = result.filter(
    (user) => user.balance > 0.01
  );

  debtors.sort(
    (a, b) => a.balance - b.balance
  );

  creditors.sort(
    (a, b) => b.balance - a.balance
  );

  const settlements: {
    from: string;
    to: string;
    fromUserId: string;
    toUserId: string;
    amount: number;
  }[] = [];

  let i = 0;
  let j = 0;

  while (
    i < debtors.length &&
    j < creditors.length
  ) {
    const debt = Math.abs(
      debtors[i].balance
    );

    const credit =
      creditors[j].balance;

    const pay = Math.min(
      debt,
      credit
    );

    settlements.push({
      from: debtors[i].name,
      to: creditors[j].name,

      fromUserId:
        debtors[i].userId,

      toUserId:
        creditors[j].userId,

      amount: Number(
        pay.toFixed(2)
      ),
    });

    debtors[i].balance += pay;
    creditors[j].balance -= pay;

    if (
      Math.abs(
        debtors[i].balance
      ) < 0.01
    ) {
      i++;
    }

    if (
      creditors[j].balance <
      0.01
    ) {
      j++;
    }
  }

  return {
    total: group.expenses.reduce(
      (sum, expense) =>
        sum + expense.amount,
      0
    ),

    memberCount:
      group.members.length,

    share:
      group.members.length > 0
        ? group.expenses.reduce(
            (sum, expense) =>
              sum + expense.amount,
            0
          ) / group.members.length
        : 0,

    balances: result,

    settlements,
  };
}
