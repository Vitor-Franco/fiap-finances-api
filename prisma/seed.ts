import { PrismaClient, TransactionTypeEnum } from '@prisma/client'
import { categories, users } from './data'
import * as bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function main () {
  const [admin] = users

  const hashedPass = await bcrypt.hash(admin.password, 10)
  const userMain = await prisma.user.create({
    data: { ...admin, password: hashedPass }
  })

  const [income, outcome] = categories
  const incomeCategory = await prisma.transactionCategory.create({
    data: {
      ...income,
      typeCategory: income.typeCategory as TransactionTypeEnum,
      FkUserId: userMain.id
    }
  })

  const outcomeCategory = await prisma.transactionCategory.create({
    data: {
      ...outcome,
      typeCategory: outcome.typeCategory as TransactionTypeEnum,
      FkUserId: userMain.id
    }
  })

  const wallet = await prisma.bankAccounts.create({
    data: {
      name: 'Carteira',
      description: 'Carteira Principal',
      FkUserId: userMain.id
    }
  })

  await prisma.transactionIncome.create({
    data: {
      amount: 4000,
      date: new Date(),
      description: 'Salário mês de setembro',
      isReceived: true,
      showInDashboard: true,
      FkUserId: userMain.id,
      FkBankAccountId: wallet.id,
      FkCategoryId: incomeCategory.id
    }
  })

  await prisma.transactionOutcome.create({
    data: {
      amount: 690,
      date: new Date(),
      description: 'Hotel 4 estrelas',
      observations: '4 dias no hotel',
      isPaid: true,
      showInDashboard: true,
      FkUserId: userMain.id,
      FkBankAccountId: wallet.id,
      FkCategoryId: outcomeCategory.id
    }
  })

  console.log('Seeding finalizado')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
