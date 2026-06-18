import prisma from "../prisma/client";

// ===================================
// Create Goal
// ===================================

export async function createGoalService(
  userId: string,
  data: {
    title: string;
    targetAmount: number;
    savedAmount: number;
    deadline: string;
    category: string;
  }
) {
  return await prisma.goal.create({
    data: {
      title: data.title,
      targetAmount: Number(data.targetAmount),
      savedAmount: Number(data.savedAmount),
      deadline: new Date(data.deadline),
      category: data.category,
      userId,
    },
  });
}

// ===================================
// Get All Goals
// ===================================

export async function getGoalsService(
  userId: string
) {
  return await prisma.goal.findMany({
    where: {
      userId,
    },
    orderBy: {
      deadline: "asc",
    },
  });
}

// ===================================
// Update Goal
// ===================================

export async function updateGoalService(
  id: string,
  data: {
    title: string;
    targetAmount: number;
    savedAmount: number;
    deadline: string;
    category: string;
  }
) {
  return await prisma.goal.update({
    where: {
      id,
    },
    data: {
      title: data.title,
      targetAmount: Number(data.targetAmount),
      savedAmount: Number(data.savedAmount),
      deadline: new Date(data.deadline),
      category: data.category,
    },
  });
}

// ===================================
// Delete Goal
// ===================================

export async function deleteGoalService(
  id: string
) {
  return await prisma.goal.delete({
    where: {
      id,
    },
  });
}

// ===================================
// Goal Analytics
// ===================================

export async function getGoalAnalyticsService(
  userId: string
) {
  const goals = await prisma.goal.findMany({
    where: {
      userId,
    },
  });

  const totalGoals = goals.length;

  const targetAmount = goals.reduce(
    (sum, goal) => sum + goal.targetAmount,
    0
  );

  const savedAmount = goals.reduce(
    (sum, goal) => sum + goal.savedAmount,
    0
  );

  const completedGoals = goals.filter(
    (goal) =>
      goal.savedAmount >= goal.targetAmount
  ).length;

  const completion =
    targetAmount > 0
      ? Number(
          (
            (savedAmount / targetAmount) *
            100
          ).toFixed(2)
        )
      : 0;

  const remainingAmount =
    targetAmount - savedAmount;

  const nearestGoal =
    goals.length > 0
      ? [...goals].sort(
          (a, b) =>
            new Date(
              a.deadline
            ).getTime() -
            new Date(
              b.deadline
            ).getTime()
        )[0]
      : null;

  return {
    totalGoals,
    completedGoals,
    targetAmount,
    savedAmount,
    remainingAmount,
    completion,
    nearestGoal,
    goals,
  };
}