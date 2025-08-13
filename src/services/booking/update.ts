import AppError from '../../types/AppError';
import { Booking } from '../../models/Booking';
import { existBooking } from './get';
import { IBooking } from '../../types/IBookinBase';
import { io } from '../../app';
import { bookingProcessor } from './worker';
import { filter, firstValueFrom, timeout } from 'rxjs';

export async function updateBooking(id: string, data: Partial<IBooking>) {
  const booking = await Booking.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, upsert: false },
  );

  return booking.toObject();
}

export async function cancelBooking(data: Partial<IBooking>) {
  const booking = await existBooking({
    occurrence: data.occurrence,
    userId: data.user,
  });

  if (!booking) throw new AppError('BOOKING_DONT_EXISTS', 400);
  await Booking.findOneAndUpdate(
    { occurrence: data.occurrence, userId: data.user },
    { isExec: false, isActive: false },
  );

  bookingProcessor.start();
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
