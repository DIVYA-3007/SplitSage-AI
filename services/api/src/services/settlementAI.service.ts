import prisma from "../prisma/client";

export async function calculateSettlement(
  groupId: string
) {
  const group =
    await prisma.group.findUnique({
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

  const balances: any = {};

  group.members.forEach((member) => {
    balances[member.user.id] = {
      user: member.user.name,
      amount: 0,
    };
  });

  group.expenses.forEach((expense) => {
    balances[expense.paidById].amount +=
      expense.amount;

    expense.participants.forEach((participant) => {
      balances[participant.userId].amount -=
        participant.shareAmount;
    });
  });

  return Object.values(balances);
}