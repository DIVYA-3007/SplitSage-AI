import prisma from "../prisma/client";

// ==============================
// Create Subscription
// ==============================

export async function createSubscriptionService(
  userId: string,
  data: {
    title: string;
    amount: number;
    category: string;
    frequency: string;
    nextDueDate: string;
  }
) {
  return await prisma.subscription.create({
    data: {
      title: data.title,
      amount: data.amount,
      category: data.category,
      frequency: data.frequency,
      nextDueDate: new Date(data.nextDueDate),
      userId,
    },
  });
}

// ==============================
// Get All Subscriptions
// ==============================

export async function getSubscriptionsService(
  userId: string
) {
  return await prisma.subscription.findMany({
    where: {
      userId,
    },
    orderBy: {
      nextDueDate: "asc",
    },
  });
}

// ==============================
// Update Subscription
// ==============================

export async function updateSubscriptionService(
  id: string,
  data: {
    title: string;
    amount: number;
    category: string;
    frequency: string;
    nextDueDate: string;
    isActive: boolean;
  }
) {
  return await prisma.subscription.update({
    where: {
      id,
    },
    data: {
      title: data.title,
      amount: data.amount,
      category: data.category,
      frequency: data.frequency,
      nextDueDate: new Date(data.nextDueDate),
      isActive: data.isActive,
    },
  });
}

// ==============================
// Delete Subscription
// ==============================

export async function deleteSubscriptionService(
  id: string
) {
  return await prisma.subscription.delete({
    where: {
      id,
    },
  });
}

// ==============================
// Subscription Summary
// ==============================

export async function getSubscriptionSummaryService(
  userId: string
) {
  const subscriptions =
    await prisma.subscription.findMany({
      where: {
        userId,
        isActive: true,
      },
    });

  let totalMonthly = 0;

  subscriptions.forEach((item) => {
    switch (item.frequency) {
      case "Monthly":
        totalMonthly += item.amount;
        break;

      case "Weekly":
        totalMonthly += item.amount * 4;
        break;

      case "Yearly":
        totalMonthly += item.amount / 12;
        break;

      default:
        totalMonthly += item.amount;
    }
  });

  return {
    totalMonthly: Number(totalMonthly.toFixed(2)),
    count: subscriptions.length,
    subscriptions,
  };
}