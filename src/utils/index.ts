import { Bcrypt } from '../libs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { Payload } from '../types/Payload';
import moment from 'moment';
import { bookingProcessor } from '../services/booking/worker';

export const hashPassword = async (password: string): Promise<string> => {
  return await new Bcrypt().hash(password, config.bcryptSaltRounds);
};

export const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, config.jwtSecret as string, {
    expiresIn: '1h',
  });
};

export const validateToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, config.jwtSecret, {
    ignoreExpiration: false,
  });
};

export const validatePassword = async (
  password: string,
  passwordHash: string,
) => {
  return new Bcrypt().compare(password, passwordHash);
};

export function isFutureDate(date: string | Date | moment.Moment): boolean {
  return moment(date).isAfter(moment(), 'day');
}
