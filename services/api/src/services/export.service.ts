import prisma from "../prisma/client";

export async function getExportData(
  groupId: string
) {
  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });

  if (!group) {
    throw new Error("Group not found");
  }

  const expenses =
    await prisma.expense.findMany({
      where: {
        groupId,
      },
      include: {
        paidBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return {
    group,
    expenses,
  };
}