import prisma from "../prisma/client";

export async function inviteMember(
  groupId: string,
  email: string
) {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  // Check if already a member
  const existingMember =
    await prisma.groupMember.findUnique({
      where: {
        userId_groupId: {
          userId: user.id,
          groupId,
        },
      },
    });

  if (existingMember) {
    throw new Error(
      "User is already a member of this group."
    );
  }

  // Add user to group
  const member =
    await prisma.groupMember.create({
      data: {
        userId: user.id,
        groupId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

  return {
    success: true,
    message: "Member added successfully.",
    member,
  };
}