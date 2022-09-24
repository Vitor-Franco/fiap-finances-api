/*
  Warnings:

  - You are about to drop the `UserToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserToken" DROP CONSTRAINT "UserToken_userId_fkey";

-- DropTable
DROP TABLE "UserToken";

-- CreateTable
CREATE TABLE "TB_USER_TOKENS" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TB_USER_TOKENS_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TB_USER_TOKENS" ADD CONSTRAINT "TB_USER_TOKENS_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TB_USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
