import { NextFunction, Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import AreTeamsValids from '../middlewares/AreTeamsValids';
import isValidToken from '../middlewares/isValidToken';
import MatchService from '../services/MatchService';

const matchRoutes = Router();
const matchServices = new MatchService();
const matchController = new MatchController(matchServices);

matchRoutes.get('/', (
  req: Request,
  res:Response,
  next:NextFunction,
) => matchController.findByProgress(req, res, next));

matchRoutes.patch('/:id/finish', isValidToken.test, (
  req: Request,
  res:Response,
  next:NextFunction,
) => matchController.finishMatch(req, res, next));

matchRoutes.patch('/:id', isValidToken.test, (
  req: Request,
  res:Response,
  next: NextFunction,
) => matchController.updateGoals(req, res, next));

matchRoutes.post('/', isValidToken.test, AreTeamsValids.test, (
  req: Request,
  res:Response,
  next:NextFunction,
) => matchController.creatMatch(req, res, next));

export default matchRoutes;
