import * as bcrypt from 'bcrypt'
import { prisma } from 'database/prismaClient'
import { addDays } from 'date-fns'
import { sign } from 'jsonwebtoken'

import auth from '@config/auth'
import { AppError } from '@exceptions/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
  refreshToken: string
}

export class AuthenticateUserUseCase {
  async execute ({ email, password }: IRequest): Promise<IResponse> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (user == null) {
      throw new AppError('Email or password incorrect')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect')
    }

    await prisma.userToken.deleteMany({
      where: {
        userId: user.id
      }
    })

    const { refreshToken, token } = auth

    const newToken = sign({}, token.secret, {
      subject: user.id,
      expiresIn: token.expires
    })

    const newRefreshToken = sign({ email: user.email }, refreshToken.secret, {
      subject: user.id,
      expiresIn: refreshToken.expires
    })

    const expireDate = addDays(new Date(), refreshToken.expiresNumber)

    await prisma.userToken.create({
      data: {
        refreshToken: newRefreshToken,
        expiresDate: expireDate,
        userId: user.id
      }
    })

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token: newToken,
      refreshToken: newRefreshToken
    }
  }
}
