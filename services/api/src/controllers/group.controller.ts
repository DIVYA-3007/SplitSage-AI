
import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  createGroup,
  getMyGroups,
  addMember,
  getGroupById,
} from "../services/group.service";

export const create = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const group =
      await createGroup(
        req.body.name,
        req.user!.id
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

export const getGroups = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groups =
      await getMyGroups(req.user!.id);

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

export const inviteMember = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId =
      req.params.groupId as string;

    const member =
      await addMember(
        groupId,
        req.body.email
      );

    return res.json({
      success: true,
      member,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getGroup = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId =
      req.params.groupId as string;

    const group =
      await getGroupById(groupId);

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
