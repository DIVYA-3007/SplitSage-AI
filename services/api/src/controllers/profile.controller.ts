import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";

import { getProfile } from "../services/profile.service";

export const profile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const data =
      await getProfile(req.user!.id);

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};