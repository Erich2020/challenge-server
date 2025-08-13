import { User } from '../../models/User';

export async function deleteUser(id: string) {
  return await User.findByIdAndDelete(id);
}