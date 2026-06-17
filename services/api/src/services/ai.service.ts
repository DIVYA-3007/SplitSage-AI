import Groq from "groq-sdk";
import prisma from "../prisma/client";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// =====================================
// Personal AI Insights
// =====================================

export async function getAIInsights(
  totalSpent: number,
  totalExpenses: number
) {
  const prompt = `
User spending summary

Total Spent: ₹${totalSpent}

Expenses Count: ${totalExpenses}

Give 3 short financial insights.
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
      temperature: 0.5,
    });

  return completion.choices[0].message.content;
}

// =====================================
// Group AI Insights
// =====================================

export async function generateGroupInsight(
  groupId: string
) {
  const expenses = await prisma.expense.findMany({
    where: {
      groupId,
    },
    include: {
      paidBy: true,
    },
  });

  if (expenses.length === 0) {
    return "No expenses found for this group.";
  }

  const summary = expenses.map((expense) => ({
    user: expense.paidBy.name,
    amount: expense.amount,
    category: expense.category,
    description: expense.description,
  }));

  const prompt = `
You are SplitSage AI, an intelligent financial advisor.

Analyze this expense data.

Respond beautifully using emojis and markdown.

Format:

📊 Spending Summary

• Total spending

• Number of expenses

👑 Highest Spender

• Name

• Amount

🍔 Largest Spending Category

• Category

• Amount

💰 Budget Suggestions

• 3 practical suggestions

🔥 Saving Tips

• 3 money-saving tips

Rules:

- Use ₹ currency.
- Keep under 150 words.
- Use simple language.
- Don't use $.
- Don't repeat information.

Expense Data:

${JSON.stringify(summary, null, 2)}
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
      temperature: 0.2,
    });

  return completion.choices[0].message.content;
}