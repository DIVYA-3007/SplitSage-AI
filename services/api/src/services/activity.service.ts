import prisma from "../prisma/client";

export async function createActivity(
  userId: string,
  action: string,
  description: string,
  groupId?: string
) {
  return await prisma.activity.create({
    data: {
      userId,
      action,
      description,
      groupId,
    },
  });
}

export async function getActivities(
  groupId?: string
) {
  return await prisma.activity.findMany({
    where: groupId
      ? {
          groupId,
        }
      : {},

    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 20,
  });
}