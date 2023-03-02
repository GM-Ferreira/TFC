import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../../database/models/UserModel';

import IPayload from '../interfaces/IPayload';
import UserService from '../services/UserService';

class isValidToken {
  public static async test(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });

    let user: User | null;
    try {
      const secret = process.env.JWT_SECRET || 'jwt_secret';
      const payload:IPayload = jwt.verify(token, secret) as IPayload;
      const email = payload.content;
      const service = new UserService();
      user = await service.findByEmail(email);
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}

export default isValidToken;
