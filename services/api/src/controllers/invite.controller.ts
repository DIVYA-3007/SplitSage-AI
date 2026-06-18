import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { inviteMember } from "../services/invite.service";

export const invite = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId = String(req.params.groupId);
    const email = String(req.body.email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const result = await inviteMember(
      groupId,
      email
    );

    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};