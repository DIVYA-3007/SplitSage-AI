import prisma from "../prisma/client";

export async function createNotification(
  userId: string,
  title: string,
  message: string,
  type: string
) {
  return await prisma.notification.create({
    data: {
      userId,
      title,
      message,
      type,
    },
  });
}

export async function getNotifications(
  userId: string
) {
  return await prisma.notification.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 50,
  });
}

export async function markAsRead(
  id: string
) {
  return await prisma.notification.update({
    where: {
      id,
    },

    data: {
      isRead: true,
    },
  });
}

export async function markAllAsRead(
  userId: string
) {
  return await prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },

    data: {
      isRead: true,
    },
  });
}