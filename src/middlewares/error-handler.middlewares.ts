import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.utils';

interface Error {
  status?: number;
  message: string;
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  logger.error(`[${statusCode}] - ${message}`);
  res.status(statusCode).json({ error: message });
}
