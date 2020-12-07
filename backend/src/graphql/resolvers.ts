import { mergeResolvers } from "@graphql-tools/merge";
import scalarsResolver from "./scalars/scalars.resolver";
import authResolver from "../auth/auth.resolver";

export default mergeResolvers([scalarsResolver, authResolver]);
