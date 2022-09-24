import * as bcrypt from "bcrypt";
import { prisma } from "database/prismaClient";

interface ICreateClient {
name: string;
email: string;
password: string;
}

export class CreateUserUseCase {
  async execute({
    email,
    name,
    password
  }: ICreateClient) {
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    if (userExist) {
      throw new Error("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword
      }
    })

    return user;
  }
}
