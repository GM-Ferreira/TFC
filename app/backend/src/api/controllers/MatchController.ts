import { NextFunction, Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

export default class MatchController {
  private _service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.findAll();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
