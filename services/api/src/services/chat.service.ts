import Groq from "groq-sdk";
import prisma from "../prisma/client";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function chatWithAI(
  userId: string,
  question: string
) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

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
          expenses: {
            include: {
              paidBy: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  });

  const prompt = `
You are SplitSage AI.

You are a smart finance assistant.

Answer ONLY using the expense data below.

If information is unavailable, politely say so.

Current User:

${user.name}
${user.email}

Groups:

${JSON.stringify(groups, null, 2)}

User Question:

${question}

Give short and helpful answers.
`;

  const completion =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      temperature: 0.3,

      messages: [
        {
          role: "system",
          content:
            "You are an AI Expense Assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  const answer =
    completion.choices[0].message.content ||
    "No answer generated.";

  await prisma.chat.create({
    data: {
      userId,
      question,
      answer,
    },
  });

  return answer;
}