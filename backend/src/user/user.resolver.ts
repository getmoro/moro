import { getUser } from "./getUser";
import { getUsers } from "./getUsers";
import { Resolvers } from "../graphql/resolvers-types";

const resolver: Resolvers = {
  Query: {
    user: getUser,
    users: getUsers,
  },
};

export default resolver;
