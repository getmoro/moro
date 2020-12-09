import { getUsers } from "./getUsers";

const resolver = {
  Query: {
    users: getUsers,
  },
};

export default resolver;
