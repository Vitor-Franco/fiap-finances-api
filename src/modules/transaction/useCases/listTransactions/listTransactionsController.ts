import { Request, Response } from 'express'
import { ListTransactionsUseCase } from './listTransactionsUseCase'

export class ListTransactionsController {
  async handle (request: Request, response: Response) {
    const userId = request.user.id

    const listTransactionsUseCase = new ListTransactionsUseCase()
    const transactions = await listTransactionsUseCase.execute(userId)
    return response.json(transactions)
  }
}
