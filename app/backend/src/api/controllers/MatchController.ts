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
    if (result.message !== 'finished') return res.status(401).json({ message: 'match not found' });
    // adicionar em routes
    // colocar o tokenvalidation como middleware
    // adicionar a routes no app
  }
}
