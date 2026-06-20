import prisma from "../prisma/client";

export async function deleteGroup(
  groupId: string,
  userId: string
) {
  // Check if group exists

  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });

  if (!group) {
    throw new Error("Group not found.");
  }

  // Check admin

  const admin =
    await prisma.groupMember.findFirst({
      where: {
        groupId,
        userId,
        isAdmin: true,
      },
    });

  if (!admin) {
    throw new Error(
      "Only admin can delete this group."
    );
  }

  // Delete activities

  await prisma.activity.deleteMany({
    where: {
      groupId,
    },
  });

  // Get expense ids

  const expenses =
    await prisma.expense.findMany({
      where: {
        groupId,
      },

      select: {
        id: true,
      },
    });

  const expenseIds = expenses.map(
    (e) => e.id
  );

  // Delete expense participants

  await prisma.expenseParticipant.deleteMany({
    where: {
      expenseId: {
        in: expenseIds,
      },
    },
  });

  // Delete receipts

  await prisma.receipt.deleteMany({
    where: {
      groupId,
    },
  });

  // Delete expenses

  await prisma.expense.deleteMany({
    where: {
      groupId,
    },
  });

  // Delete members

  await prisma.groupMember.deleteMany({
    where: {
      groupId,
    },
  });

  // Delete group

  await prisma.group.delete({
    where: {
      id: groupId,
    },
  });

  return {
    success: true,
    message: "Group deleted successfully.",
  };
}