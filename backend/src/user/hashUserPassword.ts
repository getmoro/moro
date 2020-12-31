import bcrypt from "bcrypt";
import { UserInput } from "../graphql/resolvers-types";

export const hashUserPassword = async (user: UserInput): Promise<UserInput> => {
  if (user.password) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return { ...user, password: hashedPassword };
  }
  return Promise.resolve(user);
};
