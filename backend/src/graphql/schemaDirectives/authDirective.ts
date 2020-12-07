import { AuthenticationError } from "apollo-server";
import { SchemaDirectiveVisitor } from "graphql-tools";
import {
  DirectiveLocation,
  GraphQLDirective,
  defaultFieldResolver,
  GraphQLString,
} from "graphql";

const checkAuthentication = ({ user }: any) => {
  if (!user) throw new AuthenticationError("Unauthorized access");
};

const checkRoleFunc = ({ user }: any, role: any) => {
  checkAuthentication({ user });
  if (user.role !== role) throw new AuthenticationError("Invalid role");
};

class isAuthenticated extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName = "isAuthenticated") {
    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.FIELD_DEFINITION],
    });
  }

  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = (root: any, args: any, context: any, info: any) => {
      const auth = checkAuthentication(context);
      return resolve.call(this, root, args, { ...context, auth }, info);
    };
  }
}

class hasRole extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName = "hasRole") {
    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {
        role: { type: GraphQLString },
      },
    });
  }

  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;
    const hasResolveFn = field.resolve !== undefined;
    field.resolve = (root: any, args: any, context: any, info: any) => {
      const allowedRoles = this.args.role;
      try {
        checkRoleFunc(context, allowedRoles);
      } catch (error) {
        if (!hasResolveFn) {
          return null;
        }
        throw error;
      }
      return resolve.call(this, root, args, context, info);
    };
  }
}

export default {
  isAuthenticated,
  hasRole,
};
