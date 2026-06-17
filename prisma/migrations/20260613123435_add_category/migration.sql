-- AlterTable
ALTER TABLE "public"."Expense" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Other';

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
