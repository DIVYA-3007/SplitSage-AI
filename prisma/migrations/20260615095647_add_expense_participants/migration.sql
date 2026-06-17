-- CreateTable
CREATE TABLE "public"."ExpenseParticipant" (
    "id" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "shareAmount" DOUBLE PRECISION NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExpenseParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseParticipant_expenseId_userId_key" ON "public"."ExpenseParticipant"("expenseId", "userId");

-- AddForeignKey
ALTER TABLE "public"."ExpenseParticipant" ADD CONSTRAINT "ExpenseParticipant_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "public"."Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExpenseParticipant" ADD CONSTRAINT "ExpenseParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
