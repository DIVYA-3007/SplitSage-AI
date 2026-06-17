import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";

import {
  getForecast,
} from "../services/forecast.service";

export const forecast =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const data =
        await getForecast(
          req.user!.id
        );

      return res.json({
        success: true,
        ...data,
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };