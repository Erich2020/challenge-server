import { Booking } from '../../models/Booking';

export async function getAllBookings() {
  return await Booking.find();
}
