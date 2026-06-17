import api from "./api";

export const getNotifications = async () => {
  const res = await api.get("/notifications");
  return res.data.notifications;
};

export const markAsRead = async (id: string) => {
  await api.patch(`/notifications/${id}/read`);
};