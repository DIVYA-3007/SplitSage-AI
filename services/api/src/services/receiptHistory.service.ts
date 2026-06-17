import prisma from "../prisma/client";

export async function getReceiptHistoryService(
  userId: string
) {
  return await prisma.receipt.findMany({
    where: {
      uploadedById: userId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}