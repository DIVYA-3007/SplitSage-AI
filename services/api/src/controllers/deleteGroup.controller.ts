import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";

import { deleteGroup } from "../services/deleteGroup.service";

export const removeGroup = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId = String(
      req.params.groupId
    );

    const userId = String(
      req.user!.id
    );

    const result = await deleteGroup(
      groupId,
      userId
    );

    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message:
        err.message ||
        "Failed to delete group.",
    });
  }
};