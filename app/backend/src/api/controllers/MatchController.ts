import { NextFunction, Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

export default class MatchController {
  private _service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async findByProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      console.log('query param', inProgress);

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
}
