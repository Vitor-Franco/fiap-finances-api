import { prisma } from "database/prismaClient";


interface IRequest {
  name: string;
  color: string;
  typeCategory: "INCOME" | "OUTCOME";
  userId: string;
}

export class CreateCategoryUseCase {
  async execute({
    name,
    color,
    typeCategory,
    userId
  }: IRequest) {
    const category = await prisma.transactionCategory.create({
      data: {
        FkUserId: userId,
        name,
        color,
        typeCategory
      }
    })

    return category;
  }
}
