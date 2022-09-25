import { prisma } from 'database/prismaClient'
import { addDays } from 'date-fns'
import { sign, verify } from 'jsonwebtoken'

import auth from '@config/auth'
import { AppError } from '@exceptions/AppError'

interface ITokenResponse {
  token: string
  refreshToken: string
}

interface IPayload {
  sub: string
  email: string
}

export class RefreshTokenUseCase {
  async execute (token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.refreshToken.secret) as IPayload
    const userId = sub

    const userToken = await prisma.userToken.findFirst({
      where: {
        userId,
        refreshToken: token
      }
    })

    if (!userToken) {
      throw new AppError('Refresh token does not exists!')
    }

    await prisma.userToken.delete({
      where: {
        id: userToken.id
      }
    })

    const expireDate = addDays(new Date(), auth.refreshToken.expiresNumber)
    const refreshToken = sign({ email }, auth.refreshToken.secret, {
      subject: sub,
      expiresIn: auth.refreshToken.expires
    })

    await prisma.userToken.create({
      data: {
        expiresDate: expireDate,
        refreshToken,
        userId
      }
    })

    const newToken = sign({}, auth.token.secret, {
      subject: userId,
      expiresIn: auth.token.expires
    })

    return {
      refreshToken,
      token: newToken
    }
  }
}
