import bcrypt from "bcrypt";
import { UserInput } from "../graphql/resolvers-types";

// more rounds means slower hashing but higher security
const saltRounds = 10;

export const hashUserPassword = async (user: UserInput): Promise<UserInput> => {
  if (user.password) {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    return { ...user, password: hashedPassword };
  }
  return Promise.resolve(user);
};
