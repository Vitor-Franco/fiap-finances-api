import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '@exceptions/AppError'

import auth from '@config/auth'

export async function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(token, auth.token.secret)

    request.user = {
      id: sub as string
    }

    return next()
  } catch (error) {
    throw new AppError('Invalid token', 401)
  }
}
