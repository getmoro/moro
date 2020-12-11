import { getUser } from "./getUser";
import { getUsers } from "./getUsers";

const resolver = {
  Query: {
    user: getUser,
    users: getUsers,
  },
};

export default resolver;
