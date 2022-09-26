import { prisma } from 'database/prismaClient'

import { AppError } from '@exceptions/AppError'

interface ICreateOutcomeTransaction {
  amount: number
  description: string
  observations: string
  date: Date
  isPaid: boolean
  showInDashboard: boolean
  categoryId: string
  bankAccountId: string
  userId: string
}

export class CreateOutcomeTransactionUseCase {
  async execute ({
    amount,
    description,
    observations,
    date,
    isPaid,
    showInDashboard,
    categoryId,
    bankAccountId,
    userId
  }: ICreateOutcomeTransaction) {
    const bankAccount = await prisma.bankAccounts.findFirst({
      where: {
        id: bankAccountId
      }
    })

    if (!bankAccount) {
      throw new AppError('Bank account not found', 404)
    }

    const category = await prisma.transactionCategory.findFirst({
      where: {
        id: categoryId
      }
    })

    if (!category) {
      throw new AppError('Category not found', 404)
    }

    if (category.typeCategory.toUpperCase() !== 'OUTCOME') {
      throw new AppError('Category type is not outcome', 400)
    }

    const updatedUser = prisma.bankAccounts.update({
      where: {
        id: bankAccountId
      },
      data: {
        amount: (bankAccount?.amount ?? 0) - amount
      }
    })

    const OutcomeTransaction = prisma.transactionOutcome.create({
      data: {
        amount,
        description,
        observations,
        date: new Date(date),
        isPaid,
        showInDashboard,
        FkCategoryId: categoryId,
        FkBankAccountId: bankAccountId,
        FkUserId: userId
      }
    })

    const [, outcomeTransactionCompleted] = await prisma.$transaction([
      updatedUser,
      OutcomeTransaction
    ])

    return outcomeTransactionCompleted
  }
}
