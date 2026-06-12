/*
  Warnings:

  - You are about to drop the column `paidBy` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `paidById` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "paidBy",
ADD COLUMN     "paidById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_paidById_fkey" FOREIGN KEY ("paidById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
