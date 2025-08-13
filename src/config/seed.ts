// tests/seed.ts
import { Types } from 'mongoose';
import { IUser } from '../models/User';
import { IOccurrence } from '../models/Occurrence';

export const userSeed: IUser = {
  _id: new Types.ObjectId('689b1d1ed7b5c712c79481d9'),
  name: 'string',
  email: 'test@test.com',
  pwdHash: '$2b$05$ZuI96LZz9Vb4bmliZRpNGe8iftpGw7jKt3KGLGV7nUkT/Z3MAmk6a',
} as IUser;

export const occurrenceSeed: IOccurrence = {
  _id: new Types.ObjectId('689bdfea9e6b07a9f4f5f939'),
  name: 'Test Occ',
  date: new Date('2025-08-15T00:00:00.000Z'),
  location: 'En cualqier lugar',
  capacity: 1,
  createdBy: new Types.ObjectId('689b1d1ed7b5c712c79481d9'),
} as IOccurrence;
