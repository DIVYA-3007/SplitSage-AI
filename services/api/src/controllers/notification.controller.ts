import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../services/notification.service";

export const notifications = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const data = await getNotifications(
      req.user!.id
    );

    return res.json({
      success: true,
      notifications: data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const readNotification = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Notification id is required",
      });
    }

    const notification =
      await markAsRead(id);

    return res.json({
      success: true,
      notification,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const readAllNotifications =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      await markAllAsRead(
        req.user!.id
      );

      return res.json({
        success: true,
        message:
          "All notifications marked as read",
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };