import prisma from "../prisma/client";
import { createActivity } from "./activity.service";

// =====================================
// Create Group
// =====================================

export async function createGroup(
  name: string,
  userId: string
) {
  const group = await prisma.group.create({
    data: {
      name,
    },
  });

  await prisma.groupMember.create({
    data: {
      userId,
      groupId: group.id,
      isAdmin: true, // Creator becomes admin
    },
  });

  await createActivity(
    userId,
    "GROUP_CREATED",
    `Created group "${group.name}"`,
    group.id
  );

  return group;
}

// =====================================
// Get My Groups
// =====================================

export async function getMyGroups(
  userId: string
) {
  const groups = await prisma.groupMember.findMany({
    where: {
      userId,
    },

    include: {
      group: {
        include: {
          members: {
            include: {
              user: true,
            },
          },

          expenses: true,
        },
      },
    },
  });

  return groups.map((item) => item.group);
}

// =====================================
// Add Member
// =====================================

export async function addMember(
  groupId: string,
  email: string
) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const existingMember =
    await prisma.groupMember.findFirst({
      where: {
        userId: user.id,
        groupId,
      },
    });

  if (existingMember) {
    throw new Error(
      "User already exists in this group"
    );
  }

  const member =
    await prisma.groupMember.create({
      data: {
        userId: user.id,
        groupId,
        isAdmin: false,
      },
    });

  await createActivity(
    user.id,
    "MEMBER_JOINED",
    `${user.name} joined the group`,
    groupId
  );

  return member;
}

// =====================================
// Check Admin
// =====================================

export async function isGroupAdmin(
  groupId: string,
  userId: string
) {
  const member =
    await prisma.groupMember.findFirst({
      where: {
        groupId,
        userId,
        isAdmin: true,
      },
    });

  return !!member;
}

// =====================================
// Get Group By ID
// =====================================

export async function getGroupById(
  groupId: string
) {
  const group =
    await prisma.group.findUnique({
      where: {
        id: groupId,
      },

      include: {
        members: {
          include: {
            user: true,
          },

          orderBy: {
            isAdmin: "desc",
          },
        },

        expenses: {
          include: {
            paidBy: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  if (!group) {
    throw new Error(
      "Group not found"
    );
  }

  return group;
}