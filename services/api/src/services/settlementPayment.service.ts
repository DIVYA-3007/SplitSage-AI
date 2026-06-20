import prisma from "../prisma/client";
import { createActivity } from "./activity.service";
import { createNotification } from "./notification.service";

interface MarkPaidData {
  fromUserId: string;
  toUserId: string;
  groupId: string;
  amount: number;
  note?: string;
}

export async function markSettlementPaid(
  data: MarkPaidData
) {
  const payment =
    await prisma.settlementPayment.create({
      data: {
        fromUserId: data.fromUserId,
        toUserId: data.toUserId,
        groupId: data.groupId,
        amount: data.amount,
        note: data.note,
      },
    });

  await createActivity(
    data.fromUserId,
    "SETTLEMENT_PAID",
    `Paid ₹${data.amount}`,
    data.groupId
  );

  await createNotification(
    data.toUserId,
    "Settlement Received",
    `You received ₹${data.amount}`,
    "settlement"
  );

  return payment;
}

export async function getSettlementHistory(
  groupId: string
) {
  return prisma.settlementPayment.findMany({
    where: {
      groupId,
    },
    include: {
      fromUser: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      toUser: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      paidAt: "desc",
    },
  });
}