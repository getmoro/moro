import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const typesArray = loadFilesSync(path.join(__dirname, ".."), {
  extensions: ["gql"],
});

export default mergeTypeDefs(typesArray);
