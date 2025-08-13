import { validatePassword, generateToken } from '../../utils';
import { User } from '../../models/User';

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isMatch = validatePassword(password, user.pwdHash);
  if (!isMatch) return null;

  return generateToken({
    id: user.id,
    username: user.email,
  });
}
