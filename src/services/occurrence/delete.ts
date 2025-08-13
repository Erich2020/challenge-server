import AppError from '../../types/AppError';
import { Occurrence } from '../../models/Occurrence';

export async function deleteOccurrence(id: string, userId: string) {
  const exist = await Occurrence.findOne({
    id,
    createdBy: userId,
  });
  if (!exist) throw new AppError('UNAUTHORIZED_REQUEST_BY_PERMISIONS', 400);

  return await Occurrence.findOneAndDelete({ id, createdBy: userId });
}
