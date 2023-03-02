import { NextFunction, Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchRoutes = Router();
const matchServices = new MatchService();
const matchController = new MatchController(matchServices);

matchRoutes.get('/', (
  req: Request,
  res:Response,
  next:NextFunction,
) => matchController.findAll(req, res, next));

export default matchRoutes;
