import { Router } from "express";

import { ensureAuthenticated } from "@middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "@modules/account/useCases/authenticateUser/authenticateUserController";
import { CreateUserController } from "@modules/account/useCases/createUser/createUserController";
import { RefreshTokenController } from "@modules/account/useCases/refreshToken/refreshTokenController";

export const routes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenController();

routes.post('/user', createUserController.handle)

routes.post('/sessions', authenticateUserController.handle)
routes.post('/refresh-token', refreshTokenUserController.handle)

routes.get('/', ensureAuthenticated, (req, res) => {
  return res.json({ message: 'Hello World' })
})
