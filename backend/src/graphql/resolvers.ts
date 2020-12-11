import { mergeResolvers } from "@graphql-tools/merge";
import scalarsResolver from "./scalars/scalars.resolver";
import userResolver from "../user/user.resolver";

export default mergeResolvers([scalarsResolver, userResolver]);
