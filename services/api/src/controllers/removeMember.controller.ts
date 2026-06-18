import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { removeMember } from "../services/removeMember.service";

export const remove = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId = String(req.params.groupId);
    const userId = String(req.params.userId);

    const result = await removeMember(
      groupId,
      userId
    );

    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};