import { prisma } from "database/prismaClient";

import { AppError } from "@exceptions/AppError";

interface ICreateIncomeTransaction {
  amount: number;
  description: string;
  observations: string;
  date: Date;
  isReceived: boolean;
  showInDashboard: boolean;
  categoryId: string;
  bankAccountId: string;
  userId: string;
}

export class CreateIncomeTransactionUseCase {
  async execute({
    amount,
    description,
    observations,
    date,
    isReceived,
    showInDashboard,
    categoryId,
    bankAccountId,
    userId,
  }: ICreateIncomeTransaction) {
    const bankAccount = await prisma.bankAccounts.findFirst({
      where: {
        id: bankAccountId,
      },
    });

    if (!bankAccount) {
      throw new AppError("Bank account not found", 404);
    }

    const updatedUser = prisma.bankAccounts.update({
      where: {
        id: bankAccountId,
      },
      data: {
        amount: (bankAccount?.amount || 0) + amount,
      },
    });

    const incomeTransaction = prisma.transactionIncome.create({
      data: {
        amount,
        description,
        observations,
        date: new Date(date),
        isReceived,
        showInDashboard,
        FkCategoryId: categoryId,
        FkBankAccountId: bankAccountId,
        FkUserId: userId,
      },
    });

    const [, incomeTransactionCompleted] = await prisma.$transaction([
      updatedUser,
      incomeTransaction,
    ]);

    return incomeTransactionCompleted;
  }
}
