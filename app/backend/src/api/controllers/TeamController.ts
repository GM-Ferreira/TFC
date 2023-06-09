import { NextFunction, Request, Response } from 'express';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamController {
  private _service: IServiceTeam;

  constructor(service: IServiceTeam) {
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

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this._service.findOne(Number(id));
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
