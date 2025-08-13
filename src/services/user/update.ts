import { hashPassword } from '../../utils';
import { User } from '../../models/User';

export async function updateUser(id: string, data: any) {
  let userData = { ...data };
  if (userData?.password) {
    userData.pwdHash = await hashPassword(userData.password);
    delete userData.password;
  }
  const updateData = {
    ...(await User.findByIdAndUpdate(id, data, { new: true })).toObject(),
  };
  delete updateData.pwdHash;
  delete updateData.createdAt;
  return updateData;
}
