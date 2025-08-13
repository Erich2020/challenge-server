import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import AppError from '../types/AppError';
import { validateToken } from '../utils';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      username: string;
    };
  }
}

interface TokenPayload {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError('ERR_SESSION_EXPIRED', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = validateToken(token);
    const { id, username } = decoded as TokenPayload;
    req.user = {
      id,
      username,
    };
  } catch (err) {
    console.error('auth: ', err);
    throw new AppError(
      "Invalid token. We'll try to assign a new one on next request",
      403,
    );
  }

  next();
};

export default isAuth;
