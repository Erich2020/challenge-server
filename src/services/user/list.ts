import { User } from '../../models/User';

export async function getAllUsers() {
  return await User.find();
}
