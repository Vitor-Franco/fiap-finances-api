import { prisma } from 'database/prismaClient'

export class ListTransactionsUseCase {
  async execute (userId: string) {
    const transactionsIncome = await prisma.transactionIncome.findMany({
      where: {
        FkUserId: userId
      },
      include: {
        Category: true
      }
    })

    const transactionsOutcome = await prisma.transactionOutcome.findMany({
      where: {
        FkUserId: userId
      },
      include: {
        Category: true
      }
    })

    const transactionsTransfer = await prisma.transactionTransfer.findMany({
      where: {
        FkUserId: userId
      }
    })

    const allTransactions = {
      transactionsIncome,
      transactionsOutcome,
      transactionsTransfer
    }

    return allTransactions
  }
}
