import { Router } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserController from '../controllers/UserController';

const authRouter = Router();

authRouter.post(
  '/signin',
  AuthMiddleware.validateParams,
  UserController.signIn,
);

export default authRouter;
