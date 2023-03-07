import { NextFunction, Request, Response } from 'express';
import IMatch from '../interfaces/IMatch';
import IServiceMatch from '../interfaces/IServiceMatch';

export default class MatchController {
  private _service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async findByProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;

      if (inProgress === undefined) {
        const result = await this._service.findAll();
        return res.status(200).json(result);
      }

      const boolProgress = (inProgress === 'true');

      const result = await this._service.findByProgress(boolProgress);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async finishMatch(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const result = await this._service.finishMatch(Number(id));

    if (result.message === 'finished') return res.status(200).json({ message: 'finished' });
    if (result.message !== 'finished') return res.status(401).json({ message: result.message });
  }

  async updateGoals(req: Request, res: Response, next: NextFunction) {
    try {
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const { id } = req.params;
      const result = await this._service.updateGoals(Number(id), homeTeamGoals, awayTeamGoals);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async creatMatch(req: Request, res: Response, _next: NextFunction) {
    const bodyData: IMatch = req.body;
    const newMatch = await this._service.creatMatch(bodyData);
    return res.status(201).json(newMatch);
  }
}
