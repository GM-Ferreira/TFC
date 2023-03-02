import { NextFunction, Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import isValidToken from '../middlewares/isValidToken';
import LoginFields from '../middlewares/loginFields';
import UserService from '../services/UserService';

const userRoutes = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRoutes.get('/', (
  req: Request,
  res:Response,
  next:NextFunction,
) => userController.findAll(req, res, next));

userRoutes.get('/role', isValidToken.test, (
  req: Request,
  res:Response,
  next:NextFunction,
) => userController.findByToken(req, res, next));

userRoutes.post('/', LoginFields.test, (
  req: Request,
  res:Response,
  next:NextFunction,
) => userController.findOne(req, res, next));

export default userRoutes;
