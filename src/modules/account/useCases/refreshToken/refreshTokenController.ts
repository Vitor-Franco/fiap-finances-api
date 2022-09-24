import { Request, Response } from 'express'

import { RefreshTokenUseCase } from './refreshTokenUseCase'

export class RefreshTokenController {
  async handle (request: Request, response: Response) {
    const token =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token

    const refreshTokenUseCase = new RefreshTokenUseCase()
    const refreshToken = await refreshTokenUseCase.execute(token)

    return response.json(refreshToken)
  }
}
