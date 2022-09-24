import { Request, Response } from "express";
import { CreateIncomeTransactionUseCase } from "./createIncomeTransactionUseCase";

export class CreateIncomeTransactionController {
  async handle(request: Request, response: Response) {
    const userId = request.user.id;
    const {
      amount,
      description,
      observations,
      date,
      isReceived,
      showInDashboard,
      categoryId,
      bankAccountId,
    } = request.body;

    const createIncomeTransactionUseCase = new CreateIncomeTransactionUseCase();
    const transaction = await createIncomeTransactionUseCase.execute({
      amount,
      description,
      observations,
      date,
      isReceived,
      showInDashboard,
      categoryId,
      bankAccountId,
      userId,
    });

    return response.status(201).json(transaction);
  }
}
