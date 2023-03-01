import { NextFunction, Response, Request } from 'express';

class ErrorHandler {
  public static handler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (err.message === 'Invalid email or password') {
      return res.status(401).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
}

export default ErrorHandler;
