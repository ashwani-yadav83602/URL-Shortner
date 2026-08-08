import { Request, Response, NextFunction } from 'express';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err?.status || 500;
  const message = err?.message || 'Internal Server Error';
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }
  res.status(status).json({ error: { message } });
}
