import { NextFunction, Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';

const leaderboardRoutes = Router();
const leaderboardServices = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardServices);

leaderboardRoutes.get('/', (
  req: Request,
  res:Response,
  next:NextFunction,
) => leaderboardController.leaderboard(req, res, next));

leaderboardRoutes.get('/home', (
  req: Request,
  res:Response,
  next:NextFunction,
) => leaderboardController.leaderboardHome(req, res, next));

leaderboardRoutes.get('/away', (
  req: Request,
  res:Response,
  next:NextFunction,
) => leaderboardController.leaderboardAway(req, res, next));

export default leaderboardRoutes;
