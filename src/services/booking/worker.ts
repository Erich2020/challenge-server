import { updateDisponibilityOccurrence } from '../../services/occurrence/update';
import { IBooking } from '../../models/Booking';
import { Repository } from '../../types/repository';
import { Processor } from '../../utils/worker';
import { getAllBookings } from './list';
import { updateBooking } from './update';
import { getBookingById } from './get';

export class BookingRepository implements Repository<IBooking> {
  exist(id: string): Promise<IBooking> {
    return getBookingById(id);
  }
  async getAllDataProcess(): Promise<IBooking[]> {
    const bookings = await getAllBookings();
    return bookings;
  }
  async updateData(
    id: string,
    data: IBooking,
    args?: any,
  ): Promise<
    Promise<
      | (IBooking & {
          _id: any;
        })
      | {
          _id: unknown;
          user?: string;
          occurrence?: string;
          isExec?: Boolean;
          isActive?: Boolean;
          createdAt?: Date;
          updatedAt?: Date;
        }
    >
  > {
    const dataUpdated = await updateBooking(id, {
      isExec: data.isExec,
      isActive: data.isActive,
    });
    await updateDisponibilityOccurrence(
      data.occurrence.toString(),
      data.user.toString(),
      data.isActive as boolean,
    );

    return dataUpdated;
  }
}

/**
 * BookingProcessor
 * - constructor recibe tu repositorio (DB) y el notificador (socket, events, ...).
 * - start() inicia el pipe cada 1s.
 * - stop() cancela la suscripción.
 */
export const bookingProcessor = new Processor(
  new BookingRepository(),
  'bookingProcessor',
);
