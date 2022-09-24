import { prisma } from 'database/prismaClient'

interface ICreateWallet {
  name: string
  description: string
  userId: string
}

export class CreateWalletUseCase {
  async execute ({ name, description, userId }: ICreateWallet) {
    const wallet = await prisma.bankAccounts.create({
      data: {
        name,
        description,
        FkUserId: userId,
        amount: 0
      }
    })

    return wallet
  }
}
