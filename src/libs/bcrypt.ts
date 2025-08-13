import * as libbcrypt from 'bcrypt';

export class Bcrypt {
  compare(password: string, passwordHash: string) {
    return libbcrypt.compare(password, passwordHash);
  }

  hash(password: string, saltRounds: number) {
    return libbcrypt.hash(password, saltRounds);
  }
}
