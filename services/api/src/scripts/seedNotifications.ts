import prisma from "../prisma/client";

async function main() {
  const user = await prisma.user.findFirst();

  if (!user) {
    console.log("No user found");
    return;
  }

  await prisma.notification.createMany({
    data: [
      {
        userId: user.id,
        title: "Expense Added",
        message: "Dinner expense added successfully.",
        type: "expense",
      },
      {
        userId: user.id,
        title: "Receipt Scanned",
        message: "AI extracted receipt successfully.",
        type: "receipt",
      },
      {
        userId: user.id,
        title: "AI Recommendation",
        message: "You can save ₹2500 this month.",
        type: "ai",
      },
      {
        userId: user.id,
        title: "Settlement Complete",
        message: "Settlement completed successfully.",
        type: "settlement",
      },
    ],
  });

  console.log("Notifications inserted");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });