import { Router } from "express";

import { ensureAuthenticated } from "@middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "@modules/account/useCases/authenticateUser/authenticateUserController";
import { CreateUserController } from "@modules/account/useCases/createUser/createUserController";
import { CreateWalletController } from "@modules/account/useCases/createWallet/createWalletController";
import { RefreshTokenController } from "@modules/account/useCases/refreshToken/refreshTokenController";
import { CreateCategoryController } from "@modules/transaction/useCases/createCategory/createCategoryController";
import { CreateIncomeTransactionController } from "@modules/transaction/useCases/createIncomeTransaction/createIncomeTransactionController";
import { CreateOutcomeTransactionController } from "@modules/transaction/useCases/createOutcomeTransaction/createOutcomeTransactionController";

export const routes = Router();

const createUserController = new CreateUserController();
const createWalletController = new CreateWalletController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const createCategoryController = new CreateCategoryController();
const createIncomeTransactionController =
  new CreateIncomeTransactionController();
const createOutcomeTransactionController =
  new CreateOutcomeTransactionController();

// Usuários
routes.post("/user", createUserController.handle);
routes.post(
  "/user/bank-account",
  ensureAuthenticated,
  createWalletController.handle
);

// Autenticação
routes.post("/sessions", authenticateUserController.handle);
routes.post("/refresh-token", refreshTokenController.handle);

// Transações
routes.post(
  "/transaction/category",
  ensureAuthenticated,
  createCategoryController.handle
);
routes.post(
  "/transaction/income",
  ensureAuthenticated,
  createIncomeTransactionController.handle
);
routes.post(
  "/transaction/outcome",
  ensureAuthenticated,
  createOutcomeTransactionController.handle
);
