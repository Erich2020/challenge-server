import { Occurrence } from '../../models/Occurrence';

export async function getOccurrenceById(id: string) {
  return await Occurrence.findById(id);
}

export async function getDisponibilityById(id: string) {
  const data = (await Occurrence.findById(id)).toObject();

  return data.capacity > 0;
}
