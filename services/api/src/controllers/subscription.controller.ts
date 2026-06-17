import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  createSubscriptionService,
  getSubscriptionsService,
  updateSubscriptionService,
  deleteSubscriptionService,
} from "../services/subscription.service";

// =============================
// Create Subscription
// =============================

export const createSubscription = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const subscription =
      await createSubscriptionService(
        req.user!.id,
        req.body
      );

    return res.json({
      success: true,
      subscription,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =============================
// Get All Subscriptions
// =============================

export const getSubscriptions = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const subscriptions =
      await getSubscriptionsService(
        req.user!.id
      );

    return res.json({
      success: true,
      subscriptions,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =============================
// Update Subscription
// =============================

export const updateSubscription = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const subscription =
      await updateSubscriptionService(
        id,
        req.body
      );

    return res.json({
      success: true,
      subscription,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =============================
// Delete Subscription
// =============================

export const deleteSubscription = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await deleteSubscriptionService(id);

    return res.json({
      success: true,
      message:
        "Subscription deleted successfully",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};