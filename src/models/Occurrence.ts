import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IOccurrence extends Document {
  name: string;
  date: Date;
  location: string;
  capacity: number;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const OccurrenceSchema = new Schema<IOccurrence>(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true, min: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const Occurrence = mongoose.model<IOccurrence>(
  'Occurrence',
  OccurrenceSchema,
);
