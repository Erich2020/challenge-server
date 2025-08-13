import { Request, Response, NextFunction } from 'express';
import config from '../config';
import AppError from '../types/AppError';
import { validateToken } from '../utils';

const isApikey = (req: Request, res: Response, next: NextFunction) => {
  const apikey = req.headers['api-key'] as string;
  if (!apikey) {
    throw new AppError('UNATHORIZED_KEY', 401);
  }
  if (apikey !== config.APIKEY)
    return res.status(401).json({ error: 'UNATHORIZED_KEY' });

  next();
};

export default isApikey;
