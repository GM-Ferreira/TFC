import { NextFunction, Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

export default class LeaderboardController {
  private _service: IServiceLeaderboard;

  constructor(service: IServiceLeaderboard) {
    this._service = service;
  }

  async leaderboard(req: Request, res: Response, _next: NextFunction) {
    const leaderboard = await this._service.leaderboard();

    return res.status(200).json(leaderboard);
  }

  async leaderboardHome(req: Request, res: Response, _next: NextFunction) {
    const leaderboard = await this._service.leaderboardHome();

    return res.status(200).json(leaderboard);
  }

  async leaderboardAway(req: Request, res: Response, _next: NextFunction) {
    const leaderboard = await this._service.leaderboardAway();

    return res.status(200).json(leaderboard);
  }
}
