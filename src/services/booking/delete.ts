import { Booking } from '../../models/Booking';

export async function deleteBooking(id: string) {
  return await Booking.findByIdAndDelete(id);
}