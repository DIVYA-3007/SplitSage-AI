import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  chatWithAI,
} from "../services/chat.service";

import {
  getChatHistory,
} from "../services/chatHistory.service";

import {
  createNotification,
} from "../services/notification.service";

// =====================================
// Chat With AI
// =====================================

export const chat = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const answer = await chatWithAI(
      req.user!.id,
      req.body.question
    );

    await createNotification(
      req.user!.id,
      "AI Assistant",
      `You asked: "${req.body.question}"`,
      "ai"
    );

    return res.json({
      success: true,
      answer,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================
// Chat History
// =====================================

export const history = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const chats = await getChatHistory(
      req.user!.id
    );

    return res.json({
      success: true,
      chats,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};