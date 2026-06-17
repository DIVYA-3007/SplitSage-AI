import Tesseract from "tesseract.js";
import Groq from "groq-sdk";
import prisma from "../prisma/client";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// ======================================
// OCR + AI Extraction
// ======================================

export async function extractReceiptData(
  imagePath: string
) {
  const {
    data: { text },
  } = await Tesseract.recognize(
    imagePath,
    "eng"
  );

  const cleanedText = text
    .replace(/\n+/g, "\n")
    .replace(/\s{2,}/g, " ")
    .trim();

  console.log(cleanedText);

  const prompt = `
You are an expert receipt parser.

Return ONLY valid JSON.

{
  "merchant":"",
  "amount":0,
  "category":"",
  "description":"",
  "date":""
}

OCR:

${cleanedText}
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

  let response =
    completion.choices[0].message.content || "{}";

  response = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const start = response.indexOf("{");
  const end = response.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("AI returned invalid JSON");
  }

  const parsed = JSON.parse(
    response.substring(start, end + 1)
  );

  return {
    merchant: parsed.merchant || "",
    amount: Number(parsed.amount || 0),
    category: parsed.category || "Other",
    description:
      parsed.description ||
      parsed.merchant ||
      "Receipt",
    date: parsed.date || "",
  };
}

// ======================================
// Save Expense + Receipt
// ======================================

export async function saveReceiptExpense(
  groupId: string,
  paidById: string,
  amount: number,
  description: string,
  category: string
) {
  console.log("==================================");
  console.log("GROUP ID RECEIVED =", groupId);
  console.log("USER ID =", paidById);
  console.log("==================================");

  // Auto detect group if frontend sends empty groupId
  if (!groupId || groupId.trim() === "") {
    const membership =
      await prisma.groupMember.findFirst({
        where: {
          userId: paidById,
        },
      });

    if (!membership) {
      throw new Error("No group found for user");
    }

    groupId = membership.groupId;

    console.log(
      "AUTO USING GROUP ID =",
      groupId
    );
  }

  const group =
    await prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });

  console.log("GROUP FOUND =", group);

  if (!group) {
    throw new Error("Group not found");
  }

  const user =
    await prisma.user.findUnique({
      where: {
        id: paidById,
      },
    });

  if (!user) {
    throw new Error("User not found");
  }

  const member =
    await prisma.groupMember.findFirst({
      where: {
        groupId,
        userId: paidById,
      },
    });

  if (!member) {
    throw new Error(
      "User is not a member of this group"
    );
  }

  // Create Expense
  const expense =
    await prisma.expense.create({
      data: {
        groupId,
        paidById,
        amount,
        description,
        category,
      },
    });

  console.log("EXPENSE CREATED =", expense);

  // Create Receipt History
  await prisma.receipt.create({
    data: {
      imagePath: "",
      ocrText: description,
      merchant: description,
      amount,
      category,
      description,
      receiptDate: new Date().toISOString(),
      confidence: 100,
      uploadedById: paidById,
      groupId,
      expenseId: expense.id,
    },
  });

  console.log("RECEIPT CREATED");

  return expense;
}