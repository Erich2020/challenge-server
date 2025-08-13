import { Occurrence } from '../../models/Occurrence';

export async function getAllOccurrences() {
  return await Occurrence.find();
}
