import prisma from "../prisma/client";

export async function removeMember(
  groupId: string,
  userId: string
) {
  const member = await prisma.groupMember.findFirst({
    where: {
      groupId,
      userId,
    },
  });

  if (!member) {
    throw new Error("Member not found");
  }

  await prisma.groupMember.delete({
    where: {
      id: member.id,
    },
  });

  return {
    success: true,
    message: "Member removed successfully",
  };
}