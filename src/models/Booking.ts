import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IBooking extends Document {
  user: Types.ObjectId;
  occurrence: Types.ObjectId;
  isExec: Boolean;
  isActive: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    occurrence: {
      type: Schema.Types.ObjectId,
      ref: 'Occurrence',
      required: true,
    },
    isExec: { type: Schema.Types.Boolean, required: false, default: false },
    isActive: { type: Schema.Types.Boolean, required: false, default: false },
  },
  { timestamps: true },
);

export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);
