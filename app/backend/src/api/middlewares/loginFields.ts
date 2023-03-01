import { NextFunction, Response, Request } from 'express';
import * as joi from 'joi';

class LoginFields {
  public static async test(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const loginUserSchemas = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    });

    const { error } = loginUserSchemas.validate({ email, password });
    if (error) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}

export default LoginFields;
