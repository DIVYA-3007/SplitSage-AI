import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  createGroup,
  getMyGroups,
  addMember,
  getGroupById,
  isGroupAdmin,
} from "../services/group.service";

// =====================================
// Create Group
// =====================================

export const create = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const group = await createGroup(
      String(req.body.name),
      String(req.user!.id)
    );

    return res.status(201).json({
      success: true,
      group,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================
// Get My Groups
// =====================================

export const getGroups = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groups = await getMyGroups(
      String(req.user!.id)
    );

    return res.json({
      success: true,
      groups,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================
// Invite Member (Admin Only)
// =====================================

export const inviteMember = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId = String(req.params.groupId);

    const admin = await isGroupAdmin(
      groupId,
      String(req.user!.id)
    );

    if (!admin) {
      return res.status(403).json({
        success: false,
        message:
          "Only group admin can invite members.",
      });
    }

    const member = await addMember(
      groupId,
      String(req.body.email)
    );

    return res.json({
      success: true,
      message: "Member invited successfully.",
      member,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================
// Get Group Details
// =====================================

export const getGroup = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId = String(req.params.groupId);

    const group = await getGroupById(
      groupId
    );

    return res.json({
      success: true,
      group,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
