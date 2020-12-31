import { User } from "src/graphql/resolvers-types";
import { prisma } from "../server/prisma";
import bcrypt from "bcrypt";

export const getUserByCredentials = async (
  username: string,
  password: string
): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || !user.password) {
    return null;
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    return null;
  }

  return user;
};
