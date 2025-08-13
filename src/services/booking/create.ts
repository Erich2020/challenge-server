import AppError from '../../types/AppError';
import { Booking } from '../../models/Booking';
import { existBooking } from './get';
import { getDisponibilityById } from '../../services/occurrence/get';
import { getAllBookings } from './list';
import { bookingProcessor } from './worker';
import { filter, firstValueFrom, timeout } from 'rxjs';

export async function createBooking(occurrence: string, userId: string) {
  const exist = await existBooking({ occurrence, userId });
  if (exist && exist?.isExec) throw new AppError('BOOKING_EXISTS', 400);
  if (!(await getDisponibilityById(occurrence)))
    throw new AppError('BOOKING_NOT_AVAILABLE', 400);
  bookingProcessor.start();
  const booking = exist
    ? exist
    : new Booking({
        occurrence: occurrence,
        user: userId,
        isActive: true,
      });
  if (!exist) await booking.save();
  const result = await firstValueFrom(
    bookingProcessor.events$.pipe(
      filter((event) => {
        return event.result._id == booking.id && event.result.isExec;
      }),
      timeout({ first: 5000 }),
    ),
  );
  if (result) {
    bookingProcessor.stop();
  }
  return result.result;
}

export async function workerQueueBooking() {
  const bookings = await getAllBookings();
  bookings;
}
