import { GraphQLResolveInfo } from 'graphql';
import { ApolloContext } from '../server/apolloContext';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Project = {
  __typename?: 'Project';
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  projects?: Maybe<Array<Maybe<Project>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type UserInput = {
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type CredentialsInput = {
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type EmailInput = {
  email: Scalars['String'];
};

export type NewPasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  register?: Maybe<AuthResult>;
  login?: Maybe<AuthResult>;
  forgotPassword?: Maybe<AuthResult>;
  resetPassword?: Maybe<AuthResult>;
};

export type MutationCreateUserArgs = {
  user: UserInput;
};

export type MutationRegisterArgs = {
  user: UserInput;
};

export type MutationLoginArgs = {
  credentials: CredentialsInput;
};

export type MutationForgotPasswordArgs = {
  credentials: EmailInput;
};

export type MutationResetPasswordArgs = {
  credentials: NewPasswordInput;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Project: ResolverTypeWrapper<Project>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Query: ResolverTypeWrapper<{}>;
  UserInput: UserInput;
  CredentialsInput: CredentialsInput;
  EmailInput: EmailInput;
  NewPasswordInput: NewPasswordInput;
  User: ResolverTypeWrapper<User>;
  AuthResult: ResolverTypeWrapper<AuthResult>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Mutation: ResolverTypeWrapper<{}>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Project: Project;
  Int: Scalars['Int'];
  String: Scalars['String'];
  Query: {};
  UserInput: UserInput;
  CredentialsInput: CredentialsInput;
  EmailInput: EmailInput;
  NewPasswordInput: NewPasswordInput;
  User: User;
  AuthResult: AuthResult;
  Boolean: Scalars['Boolean'];
  Mutation: {};
}>;

export type IsAuthenticatedDirectiveArgs = {};

export type IsAuthenticatedDirectiveResolver<
  Result,
  Parent,
  ContextType = ApolloContext,
  Args = IsAuthenticatedDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type HasRoleDirectiveArgs = { role?: Maybe<Scalars['String']> };

export type HasRoleDirectiveResolver<
  Result,
  Parent,
  ContextType = ApolloContext,
  Args = HasRoleDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ProjectResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  projects?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Project']>>>,
    ParentType,
    ContextType
  >;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthResultResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['AuthResult'] = ResolversParentTypes['AuthResult']
> = ResolversObject<{
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  createUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'user'>
  >;
  register?: Resolver<
    Maybe<ResolversTypes['AuthResult']>,
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, 'user'>
  >;
  login?: Resolver<
    Maybe<ResolversTypes['AuthResult']>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'credentials'>
  >;
  forgotPassword?: Resolver<
    Maybe<ResolversTypes['AuthResult']>,
    ParentType,
    ContextType,
    RequireFields<MutationForgotPasswordArgs, 'credentials'>
  >;
  resetPassword?: Resolver<
    Maybe<ResolversTypes['AuthResult']>,
    ParentType,
    ContextType,
    RequireFields<MutationResetPasswordArgs, 'credentials'>
  >;
}>;

export type Resolvers<ContextType = ApolloContext> = ResolversObject<{
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  AuthResult?: AuthResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ApolloContext> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = ApolloContext> = ResolversObject<{
  isAuthenticated?: IsAuthenticatedDirectiveResolver<any, any, ContextType>;
  hasRole?: HasRoleDirectiveResolver<any, any, ContextType>;
}>;

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<
  ContextType = ApolloContext
> = DirectiveResolvers<ContextType>;
