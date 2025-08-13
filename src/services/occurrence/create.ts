import { Occurrence, IOccurrence } from '../../models/Occurrence';

export async function createOccurrence(
  data: Partial<IOccurrence>,
  userId: string,
) {
  const occurrence = new Occurrence({ ...data, createdBy: userId });
  return await occurrence.save();
}
