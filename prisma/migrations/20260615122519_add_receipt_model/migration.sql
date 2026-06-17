-- CreateTable
CREATE TABLE "public"."Receipt" (
    "id" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "ocrText" TEXT NOT NULL,
    "merchant" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "receiptDate" TEXT,
    "confidence" DOUBLE PRECISION,
    "expenseId" TEXT,
    "uploadedById" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_expenseId_key" ON "public"."Receipt"("expenseId");

-- CreateIndex
CREATE INDEX "Receipt_groupId_idx" ON "public"."Receipt"("groupId");

-- CreateIndex
CREATE INDEX "Receipt_uploadedById_idx" ON "public"."Receipt"("uploadedById");

-- AddForeignKey
ALTER TABLE "public"."Receipt" ADD CONSTRAINT "Receipt_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "public"."Expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Receipt" ADD CONSTRAINT "Receipt_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Receipt" ADD CONSTRAINT "Receipt_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
