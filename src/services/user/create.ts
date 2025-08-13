import { hashPassword } from '../../utils';
import { User } from '../../models/User';
import { IUserCreate } from '../../types/userCreate';

export async function createUser(data: Partial<IUserCreate>) {
  const pass = data.password || '';
  delete data.password;
  const user = new User({ ...data, pwdHash: await hashPassword(pass) });
  let createdUser = { ...(await user.save()).toObject() };
  delete createdUser.pwdHash;
  delete createdUser.updatedAt;
  return createdUser;
}
