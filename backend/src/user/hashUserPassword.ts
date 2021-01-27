import bcrypt from 'bcrypt';

// more rounds means slower hashing but higher security
const saltRounds = 10;

interface IObjectWithPassword {
  password: string;
}

export const hashUserPassword = async <T extends IObjectWithPassword>(
  user: T,
): Promise<T> => {
  if (user.password) {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    return { ...user, password: hashedPassword };
  }
  return Promise.resolve(user);
};
