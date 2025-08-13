import AppError from '../types/AppError';
import {
  createBooking,
  getBookingById,
  getAllBookings,
  cancelBooking,
  deleteBooking,
} from '../services/booking';
import { body } from 'express-validator';

export const createBookingValidators = [
  body('occurrence').isString().withMessage('INVALID_OCCURRENCE'),
];

export const updateBookingValidators = [
  body('user').optional().isString().withMessage('INVALID_USER'),
  body('occurrence').optional().isString().withMessage('INVALID_OCCURRENCE'),
];

export class BookingController {
  async create(req: any, res: any) {
    try {
      const { occurrence } = req.body;
      const { id: userId } = req.user;

      const booking = await createBooking(occurrence, userId);
      return res.status(201).json(booking);
    } catch (err: any) {
      console.error(err);
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  async get(req: any, res: any) {
    try {
      const booking = await getBookingById(req.params.id);
      if (!booking) return res.status(404).json({ error: 'BOOKING_NOT_FOUND' });
      return res.json(booking);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async list(req: any, res: any) {
    try {
      const bookings = await getAllBookings();
      return res.json(bookings);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async update(req: any, res: any) {
    try {
      const { occurrence } = req.body;
      const { id: userId } = req.user;
      const booking = await cancelBooking({
        occurrence,
        user: userId,
      });
      if (!booking)
        return res.status(404).json({ error: 'BOOKING_DONT_UPDATE' });
      return res.json(booking);
    } catch (err: any) {
      if (err instanceof AppError)
        return res.status(err.statusCode).json({ error: err.message });
      return res.status(500).json({ error: err.message });
    }
  }

  async delete(req: any, res: any) {
    try {
      const booking = await deleteBooking(req.params.id);
      if (!booking)
        return res.status(404).json({ error: 'BOOKING_DONT_DELETE' });
      return res.json({ message: 'Booking deleted' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
