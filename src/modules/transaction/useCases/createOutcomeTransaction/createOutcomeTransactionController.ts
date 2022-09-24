import { Request, Response } from "express";

import { CreateOutcomeTransactionUseCase } from "./createOutcomeTransactionUseCase";

export class CreateOutcomeTransactionController {
  async handle(request: Request, response: Response) {
    const userId = request.user.id;
    const {
      amount,
      description,
      observations,
      date,
      isPaid,
      showInDashboard,
      categoryId,
      bankAccountId,
    } = request.body;

    const createOutcomeTransactionUseCase =
      new CreateOutcomeTransactionUseCase();

    const transaction = await createOutcomeTransactionUseCase.execute({
      amount,
      description,
      observations,
      date,
      isPaid,
      showInDashboard,
      categoryId,
      bankAccountId,
      userId,
    });

    return response.status(201).json(transaction);
  }
}
