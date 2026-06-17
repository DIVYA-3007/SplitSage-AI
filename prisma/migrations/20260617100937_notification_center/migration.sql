-- CreateTable
CREATE TABLE "public"."Chat" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Chat_userId_idx" ON "public"."Chat"("userId");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "public"."Notification"("userId");

-- CreateIndex
CREATE INDEX "Activity_userId_idx" ON "public"."Activity"("userId");

-- CreateIndex
CREATE INDEX "Activity_groupId_idx" ON "public"."Activity"("groupId");

-- CreateIndex
CREATE INDEX "Expense_groupId_idx" ON "public"."Expense"("groupId");

-- CreateIndex
CREATE INDEX "Expense_paidById_idx" ON "public"."Expense"("paidById");

-- CreateIndex
CREATE INDEX "ExpenseParticipant_expenseId_idx" ON "public"."ExpenseParticipant"("expenseId");

-- CreateIndex
CREATE INDEX "ExpenseParticipant_userId_idx" ON "public"."ExpenseParticipant"("userId");

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
