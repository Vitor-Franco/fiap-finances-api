import auth from "@config/auth";
import { AppError } from "@exceptions/AppError";
import { prisma } from "database/prismaClient";
import { addDays } from "date-fns";
import { sign, verify } from "jsonwebtoken";

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

interface IPayload {
  sub: string;
  email: string;
}

export class RefreshTokenUseCase {
  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.refresh_token.secret) as IPayload;
    const user_id = sub;

    const userToken = await prisma.userToken.findFirst({
      where: {
        userId: user_id,
        refreshToken: token
      }
    });

    if (!userToken) {
      throw new AppError("Refresh token does not exists!");
    }

    await prisma.userToken.delete({
      where: {
        id: userToken.id
      }
    });

    const expireDate = addDays(new Date(), auth.refresh_token.expiresNumber);
    const refresh_token = sign({ email }, auth.refresh_token.secret, {
      subject: sub,
      expiresIn: auth.refresh_token.expires
    });

    await prisma.userToken.create({
      data: {
        expiresDate: expireDate,
        refreshToken: refresh_token,
        userId: user_id
      }
    });

    const newToken = sign({}, auth.token.secret, {
      subject: user_id,
      expiresIn: auth.token.expires
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}
