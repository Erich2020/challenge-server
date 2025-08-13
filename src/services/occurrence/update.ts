import AppError from '../../types/AppError';
import { Occurrence } from '../../models/Occurrence';

export async function updateOccurrence(id: string, data: any, userId: string) {
  const exist = await Occurrence.findOne({
    id,
    createdBy: userId,
  });
  if (!exist) throw new AppError('UNAUTHORIZED_REQUEST_BY_PERMISIONS', 400);
  await exist.update(data);
  return { ...exist.toObject(), ...data };
}

export async function updateDisponibilityOccurrence(
  id: string,
  userId: string,
  isActive: boolean,
) {
  const occurrence = await Occurrence.findOne({ id, createdBy: userId });
  await occurrence.update({
    capacity: isActive
      ? --occurrence.toObject().capacity
      : ++occurrence.toObject().capacity,
  });
  return occurrence;
}
