import { Request, Response } from 'express'

import { CreateWalletUseCase } from './createWalletUseCase'

export class CreateWalletController {
  async handle (request: Request, response: Response) {
    const userId = request.user.id
    const { name, description } = request.body

    const createWalletUseCase = new CreateWalletUseCase()
    const wallet = await createWalletUseCase.execute({
      name,
      description,
      userId
    })

    return response.status(201).json({
      wallet
    })
  }
}
