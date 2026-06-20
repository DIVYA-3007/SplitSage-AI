import prisma from "../prisma/client";

export async function leaveGroup(
  groupId: string,
  userId: string
) {
  // Check if user is a member
  const member = await prisma.groupMember.findFirst({
    where: {
      groupId,
      userId,
    },
  });

  if (!member) {
    throw new Error(
      "You are not a member of this group."
    );
  }

  // Count total members
  const totalMembers =
    await prisma.groupMember.count({
      where: {
        groupId,
      },
    });

  // Prevent orphan group
  if (totalMembers === 1) {
    throw new Error(
      "You cannot leave the group because you are the last member."
    );
  }

  // Remove membership
  await prisma.groupMember.delete({
    where: {
      id: member.id,
    },
  });

  return {
    success: true,
    message: "You left the group successfully.",
  };
}
