import prisma from "../prisma/client";

export async function getChatHistory(
  userId: string
) {
  return await prisma.chat.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "asc",
    },
  });
}