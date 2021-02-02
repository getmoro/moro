import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getAccessList: Array<Scalars['String']>;
  projects?: Maybe<Array<Maybe<Project>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Project = {
  __typename?: 'Project';
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
};

export type UserInput = {
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type AdminUserInput = {
  id: Scalars['Int'];
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  accessList?: Maybe<Array<Scalars['String']>>;
};

export type CredentialsInput = {
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type EmailInput = {
  email: Scalars['String'];
};

export type NewPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export enum AuthServices {
  Google = 'GOOGLE',
}

export type SocialLoginInput = {
  service: AuthServices;
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  accessList?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  updateUser?: Maybe<User>;
  register?: Maybe<AuthResult>;
  login?: Maybe<AuthResult>;
  forgotPassword?: Maybe<AuthResult>;
  resetPassword?: Maybe<AuthResult>;
  validateSocialLogin?: Maybe<AuthResult>;
};

export type MutationCreateUserArgs = {
  user: UserInput;
};

export type MutationUpdateUserArgs = {
  user: AdminUserInput;
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

export type MutationValidateSocialLoginArgs = {
  credentials: SocialLoginInput;
};

export type ForgotPasswordMutationVariables = Exact<{
  credentials: EmailInput;
}>;

export type ForgotPasswordMutation = { __typename?: 'Mutation' } & {
  forgotPassword?: Maybe<
    { __typename?: 'AuthResult' } & Pick<AuthResult, 'success' | 'message'>
  >;
};

export type ResetPasswordMutationVariables = Exact<{
  credentials: NewPasswordInput;
}>;

export type ResetPasswordMutation = { __typename?: 'Mutation' } & {
  resetPassword?: Maybe<
    { __typename?: 'AuthResult' } & Pick<AuthResult, 'success' | 'message' | 'token'>
  >;
};

export type LoginMutationVariables = Exact<{
  credentials: CredentialsInput;
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login?: Maybe<
    { __typename?: 'AuthResult' } & Pick<AuthResult, 'success' | 'token' | 'message'>
  >;
};

export type RegisterMutationVariables = Exact<{
  user: UserInput;
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register?: Maybe<
    { __typename?: 'AuthResult' } & Pick<AuthResult, 'success' | 'token' | 'message'>
  >;
};

export type ValidateSocialLoginMutationVariables = Exact<{
  credentials: SocialLoginInput;
}>;

export type ValidateSocialLoginMutation = { __typename?: 'Mutation' } & {
  validateSocialLogin?: Maybe<
    { __typename?: 'AuthResult' } & Pick<AuthResult, 'success' | 'token' | 'message'>
  >;
};

export type UserQueryVariables = Exact<{ [key: string]: never }>;

export type UserQuery = { __typename?: 'Query' } & {
  user?: Maybe<{ __typename?: 'User' } & Pick<User, 'email' | 'name'>>;
};

export const ForgotPasswordDocument = gql`
  mutation forgotPassword($credentials: EmailInput!) {
    forgotPassword(credentials: $credentials) {
      success
      message
    }
  }
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >,
) {
  return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument,
    baseOptions,
  );
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const ResetPasswordDocument = gql`
  mutation resetPassword($credentials: NewPasswordInput!) {
    resetPassword(credentials: $credentials) {
      success
      message
      token
    }
  }
`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >,
) {
  return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(
    ResetPasswordDocument,
    baseOptions,
  );
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const LoginDocument = gql`
  mutation login($credentials: CredentialsInput!) {
    login(credentials: $credentials) {
      success
      token
      message
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation register($user: UserInput!) {
    register(user: $user) {
      success
      token
      message
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions,
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const ValidateSocialLoginDocument = gql`
  mutation validateSocialLogin($credentials: SocialLoginInput!) {
    validateSocialLogin(credentials: $credentials) {
      success
      token
      message
    }
  }
`;
export type ValidateSocialLoginMutationFn = Apollo.MutationFunction<
  ValidateSocialLoginMutation,
  ValidateSocialLoginMutationVariables
>;

/**
 * __useValidateSocialLoginMutation__
 *
 * To run a mutation, you first call `useValidateSocialLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateSocialLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateSocialLoginMutation, { data, loading, error }] = useValidateSocialLoginMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useValidateSocialLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ValidateSocialLoginMutation,
    ValidateSocialLoginMutationVariables
  >,
) {
  return Apollo.useMutation<
    ValidateSocialLoginMutation,
    ValidateSocialLoginMutationVariables
  >(ValidateSocialLoginDocument, baseOptions);
}
export type ValidateSocialLoginMutationHookResult = ReturnType<
  typeof useValidateSocialLoginMutation
>;
export type ValidateSocialLoginMutationResult = Apollo.MutationResult<ValidateSocialLoginMutation>;
export type ValidateSocialLoginMutationOptions = Apollo.BaseMutationOptions<
  ValidateSocialLoginMutation,
  ValidateSocialLoginMutationVariables
>;
export const UserDocument = gql`
  query user {
    user {
      email
      name
    }
  }
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>,
) {
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>,
) {
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
