import { Request, Response } from 'express'

import { CreateCategoryUseCase } from './createCategoryUseCase'

export class CreateCategoryController {
  async handle (request: Request, response: Response) {
    const userId = request.user.id
    const { name, color, typeCategory } = request.body

    const createCategoryUseCase = new CreateCategoryUseCase()

    const category = await createCategoryUseCase.execute({
      name,
      color,
      typeCategory,
      userId
    })

    return response.status(201).json(category)
  }
}
