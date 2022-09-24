/*
  Warnings:

  - You are about to drop the `TB_ACCOUNT` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `FkUserId` to the `TB_TRANSACTION_CATEGORY` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FkBankAccountId` to the `TB_TRANSACTION_INCOME` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FkCategoryId` to the `TB_TRANSACTION_INCOME` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FkUserId` to the `TB_TRANSACTION_INCOME` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FkBankAccountId` to the `TB_TRANSACTION_OUTCOME` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FkCategoryId` to the `TB_TRANSACTION_OUTCOME` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FkUserId` to the `TB_TRANSACTION_OUTCOME` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FkUserId` to the `TB_TRANSACTION_TRANSFER` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TB_TRANSACTION_CATEGORY" ADD COLUMN     "FkUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TB_TRANSACTION_INCOME" ADD COLUMN     "FkBankAccountId" TEXT NOT NULL,
ADD COLUMN     "FkCategoryId" TEXT NOT NULL,
ADD COLUMN     "FkUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TB_TRANSACTION_OUTCOME" ADD COLUMN     "FkBankAccountId" TEXT NOT NULL,
ADD COLUMN     "FkCategoryId" TEXT NOT NULL,
ADD COLUMN     "FkUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TB_TRANSACTION_TRANSFER" ADD COLUMN     "FkUserId" TEXT NOT NULL;

-- DropTable
DROP TABLE "TB_ACCOUNT";

-- CreateTable
CREATE TABLE "TB_BANK_ACCOUNT" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FkUserId" TEXT NOT NULL,

    CONSTRAINT "TB_BANK_ACCOUNT_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TB_BANK_ACCOUNT_name_key" ON "TB_BANK_ACCOUNT"("name");

-- AddForeignKey
ALTER TABLE "TB_BANK_ACCOUNT" ADD CONSTRAINT "TB_BANK_ACCOUNT_FkUserId_fkey" FOREIGN KEY ("FkUserId") REFERENCES "TB_USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TB_TRANSACTION_CATEGORY" ADD CONSTRAINT "TB_TRANSACTION_CATEGORY_FkUserId_fkey" FOREIGN KEY ("FkUserId") REFERENCES "TB_USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TB_TRANSACTION_INCOME" ADD CONSTRAINT "TB_TRANSACTION_INCOME_FkUserId_fkey" FOREIGN KEY ("FkUserId") REFERENCES "TB_USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TB_TRANSACTION_INCOME" ADD CONSTRAINT "TB_TRANSACTION_INCOME_FkCategoryId_fkey" FOREIGN KEY ("FkCategoryId") REFERENCES "TB_TRANSACTION_CATEGORY"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TB_TRANSACTION_INCOME" ADD CONSTRAINT "TB_TRANSACTION_INCOME_FkBankAccountId_fkey" FOREIGN KEY ("FkBankAccountId") REFERENCES "TB_BANK_ACCOUNT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TB_TRANSACTION_OUTCOME" ADD CONSTRAINT "TB_TRANSACTION_OUTCOME_FkCategoryId_fkey" FOREIGN KEY ("FkCategoryId") REFERENCES "TB_TRANSACTION_CATEGORY"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TB_TRANSACTION_OUTCOME" ADD CONSTRAINT "TB_TRANSACTION_OUTCOME_FkUserId_fkey" FOREIGN KEY ("FkUserId") REFERENCES "TB_USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TB_TRANSACTION_OUTCOME" ADD CONSTRAINT "TB_TRANSACTION_OUTCOME_FkBankAccountId_fkey" FOREIGN KEY ("FkBankAccountId") REFERENCES "TB_BANK_ACCOUNT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TB_TRANSACTION_TRANSFER" ADD CONSTRAINT "TB_TRANSACTION_TRANSFER_FkUserId_fkey" FOREIGN KEY ("FkUserId") REFERENCES "TB_USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
