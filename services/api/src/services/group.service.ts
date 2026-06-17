import prisma from "../prisma/client";
import { createActivity } from "./activity.service";

// =====================================
// Create Group
// =====================================

export async function createGroup(
  name: string,
  userId: string
) {
  console.log("CREATE GROUP USER ID =", userId);

  const group = await prisma.group.create({
    data: {
      name,
    },
  });

  console.log("GROUP CREATED =", group.id);

  await prisma.groupMember.create({
    data: {
      userId,
      groupId: group.id,
    },
  });

  // Create Activity
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
  console.log("================================");
  console.log("USER ID =", userId);

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

  console.log(
    "GROUP MEMBERS FOUND =",
    groups.length
  );

  console.log(
    JSON.stringify(groups, null, 2)
  );

  console.log("================================");

  return groups.map(
    (item) => item.group
  );
}

// =====================================
// Add Member
// =====================================

export async function addMember(
  groupId: string,
  email: string
) {
  const user =
    await prisma.user.findUnique({
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
      },
    });

  // Create Activity
  await createActivity(
    user.id,
    "MEMBER_JOINED",
    `${user.name} joined the group`,
    groupId
  );

  return member;
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