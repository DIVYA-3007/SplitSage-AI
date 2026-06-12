import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";
import { loginUser } from "../services/auth.service";
import prisma from "../prisma/client";
import { AuthRequest } from "../middleware/auth.middleware";

export const me = async (
  req: AuthRequest,
  res: Response
) => {

  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  res.json(user);
};
export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);

    return res.json({
      success: true,
      token: result.token,
      user: result.user,
    });

  } catch (err: any) {

    return res.status(400).json({
      success: false,
      message: err.message,
    });

  }
};
export const register = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};