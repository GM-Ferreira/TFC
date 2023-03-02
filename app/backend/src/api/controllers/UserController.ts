import { NextFunction, Request, Response } from 'express';
import IServiceUser from '../interfaces/IServiceUser';

export default class UserController {
  private _service: IServiceUser;

  constructor(service: IServiceUser) {
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
      const { email, password } = req.body;
      const result = await this._service.findOne(email, password);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findByToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization as string;
      const result = await this._service.findByToken(token);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
