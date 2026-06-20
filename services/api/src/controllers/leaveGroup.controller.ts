import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { leaveGroup } from "../services/leaveGroup.service";

export const leave = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId = String(req.params.groupId);

    const result = await leaveGroup(
      groupId,
      req.user!.id
    );

    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};