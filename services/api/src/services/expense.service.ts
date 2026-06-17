import prisma from "../prisma/client";
import Groq from "groq-sdk";
import { createActivity } from "./activity.service";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

interface ExpenseData {
  groupId: string;
  paidBy: string;
  amount: number;
  description: string;
  category: string;
}

interface ExpenseParticipantData {
  userId: string;
  shareAmount: number;
}

interface ExpenseWithParticipantsData {
  groupId: string;
  paidBy: string;
  amount: number;
  description: string;
  category: string;
  participants: ExpenseParticipantData[];
}

// =====================================
// Create Expense
// =====================================

export async function createExpenseService(
  data: ExpenseData
) {
  const group = await prisma.group.findUnique({
    where: {
      id: data.groupId,
    },
  });

  if (!group) {
    throw new Error("Group not found");
  }

  const member = await prisma.groupMember.findFirst({
    where: {
      userId: data.paidBy,
      groupId: data.groupId,
    },
  });

  if (!member) {
    throw new Error(
      "You are not a member of this group"
    );
  }

  const expense = await prisma.expense.create({
    data: {
      groupId: data.groupId,
      paidById: data.paidBy,
      amount: data.amount,
      description: data.description,
      category: data.category,
    },
  });

  await createActivity(
    data.paidBy,
    "EXPENSE_ADDED",
    `Added expense "${data.description}" (₹${data.amount})`,
    data.groupId
  );

  return expense;
}

// =====================================
// Get Expenses
// =====================================

export async function getExpensesService(
  groupId: string
) {
  return await prisma.expense.findMany({
    where: {
      groupId,
    },
    include: {
      paidBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// =====================================
// Update Expense
// =====================================

export async function updateExpenseService(
  expenseId: string,
  data: {
    amount: number;
    description: string;
    category: string;
  }
) {
  return await prisma.expense.update({
    where: {
      id: expenseId,
    },
    data: {
      amount: data.amount,
      description: data.description,
      category: data.category,
    },
  });
}

// =====================================
// Delete Expense
// =====================================

export async function deleteExpenseService(
  expenseId: string
) {
  return await prisma.expense.delete({
    where: {
      id: expenseId,
    },
  });
}

// =====================================
// Save Receipt Expense
// =====================================

export async function saveReceiptExpense(
  groupId: string,
  paidById: string,
  amount: number,
  description: string,
  category: string
) {
  const expense = await prisma.expense.create({
    data: {
      groupId,
      paidById,
      amount,
      description,
      category,
    },
  });

  await createActivity(
    paidById,
    "RECEIPT_SCANNED",
    `Scanned receipt "${description}" (₹${amount})`,
    groupId
  );

  return expense;
}

// =====================================
// AI Expense Chat
// =====================================

export async function askExpenseAI(
  groupId: string,
  question: string
) {
  const expenses = await prisma.expense.findMany({
    where: {
      groupId,
    },
    include: {
      paidBy: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (expenses.length === 0) {
    return "No expenses found for this group.";
  }

  const prompt = `
You are SplitSage AI.

Below is the expense data.

${JSON.stringify(expenses, null, 2)}

Answer the user's question.

Question:
${question}

Rules:
- Answer only using provided data.
- Use ₹ for currency.
- Keep answers short.
`;

  const completion =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
    });

  return (
    completion.choices[0].message.content ??
    "No response generated."
  );
}

// =====================================
// Create Expense With Participants
// =====================================

export async function createExpenseWithParticipantsService(
  data: ExpenseWithParticipantsData
) {
  const group = await prisma.group.findUnique({
    where: {
      id: data.groupId,
    },
  });

  if (!group) {
    throw new Error("Group not found");
  }

  const payer = await prisma.groupMember.findFirst({
    where: {
      groupId: data.groupId,
      userId: data.paidBy,
    },
  });

  if (!payer) {
    throw new Error(
      "Payer is not a member of this group"
    );
  }

  for (const participant of data.participants) {
    const user = await prisma.user.findUnique({
      where: {
        id: participant.userId,
      },
    });

    if (!user) {
      throw new Error(
        `User not found: ${participant.userId}`
      );
    }

    const member = await prisma.groupMember.findFirst({
      where: {
        groupId: data.groupId,
        userId: participant.userId,
      },
    });

    if (!member) {
      throw new Error(
        `${user.name || user.email} is not a member of this group`
      );
    }
  }

  const expense = await prisma.expense.create({
    data: {
      groupId: data.groupId,
      paidById: data.paidBy,
      amount: data.amount,
      description: data.description,
      category: data.category,
    },
  });

  await prisma.expenseParticipant.createMany({
    data: data.participants.map((participant) => ({
      expenseId: expense.id,
      userId: participant.userId,
      shareAmount: participant.shareAmount,
      paid: false,
    })),
  });

  await createActivity(
    data.paidBy,
    "EXPENSE_ADDED",
    `Added expense "${data.description}" (₹${data.amount})`,
    data.groupId
  );

  return await prisma.expense.findUnique({
    where: {
      id: expense.id,
    },
    include: {
      paidBy: true,
      participants: {
        include: {
          user: true,
        },
      },
    },
  });
}