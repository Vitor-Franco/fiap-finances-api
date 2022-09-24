import * as bcrypt from "bcrypt";
import { prisma } from "database/prismaClient";

import { AppError } from "@exceptions/AppError";

import { CreateWalletUseCase } from "../createWallet/createWalletUseCase";

interface ICreateClient {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  async execute({ email, name, password }: ICreateClient) {
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      throw new AppError("User already exists", 400);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    });

    const createWallet = new CreateWalletUseCase();
    const wallet = await createWallet.execute({
      description: "Carteira principal",
      userId: user.id,
      name: "Carteira",
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      wallet,
    };
  }
}
