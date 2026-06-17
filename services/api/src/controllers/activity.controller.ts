
import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  getActivities as getActivitiesService,
} from "../services/activity.service";

export const getActivities = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId = req.params.groupId as string;

    const activities =
      await getActivitiesService(groupId);

    return res.status(200).json({
      success: true,
      activities,
    });
  } catch (err: any) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Failed to fetch activities",
    });
  }
};
