-- CreateEnum
CREATE TYPE "TransactionTypeEnum" AS ENUM ('INCOME', 'OUTCOME');

-- CreateTable
CREATE TABLE "TB_ACCOUNT" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TB_ACCOUNT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TB_USERS" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TB_USERS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TB_TRANSACTION_CATEGORY" (
    "id" TEXT NOT NULL,
    "typeCategory" "TransactionTypeEnum" NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "color" TEXT NOT NULL,

    CONSTRAINT "TB_TRANSACTION_CATEGORY_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TB_TRANSACTION_INCOME" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "observations" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "isReceived" BOOLEAN NOT NULL,
    "showInDashboard" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TB_TRANSACTION_INCOME_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TB_TRANSACTION_OUTCOME" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "observations" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "showInDashboard" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TB_TRANSACTION_OUTCOME_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TB_TRANSACTION_TRANSFER" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "showInDashboard" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TB_TRANSACTION_TRANSFER_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TB_ACCOUNT_name_key" ON "TB_ACCOUNT"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TB_USERS_email_key" ON "TB_USERS"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TB_TRANSACTION_CATEGORY_name_key" ON "TB_TRANSACTION_CATEGORY"("name");
