import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const createUserUseCase = new AuthenticateUserUseCase();

    const token = await createUserUseCase.execute({
      email,
      password,
    });

    return response.json(token);
  }
}
