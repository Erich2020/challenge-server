import { Booking } from '../../models/Booking';

export async function getBookingById(id: string) {
  return await Booking.findById(id);
}

export async function existBooking({
  occurrence,
  userId,
}: {
  occurrence: string;
  userId: string;
}) {
  const exist = await Booking.findOne({
    occurrence,
    user: userId,
  });
  return exist;
}
