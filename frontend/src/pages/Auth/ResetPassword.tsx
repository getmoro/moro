import React, { FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { parse } from 'qs';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { NewPasswordInput, useResetPasswordMutation } from '../../graphql/hooks';
import { AuthContainer } from './AuthContainer';
import { Link } from './Link';
import { setToken } from '../../utils/token';

type ResetPasswordFormType = Omit<NewPasswordInput, 'token'> & { repeatPassword: string };

export const ResetPassword: FC = () => {
  const history = useHistory(); // used to redirect to app after successful password reset

  // get token from location
  const { search } = useLocation();
  const { token } = parse(search.replace('?', '')) as { token: string };

  const { handleSubmit, register, errors, watch } = useForm<ResetPasswordFormType>(); // handles form values
  const password = useRef<string | null | undefined>(''); // to use form watch and get password field value to compare it with repeatPassword
  password.current = watch('password', '');
  const [resetPasswordMutation, { loading, data }] = useResetPasswordMutation({
    errorPolicy: 'all',
  }); // request handler

  const handle = async (values: ResetPasswordFormType): Promise<void> => {
    const { repeatPassword, ...credentials } = values;
    if (!token) {
      // this actually always exists, because we would redirect user to forgetPassword otherwise
      return;
    }

    const { data } = await resetPasswordMutation({
      variables: { credentials: { ...credentials, token } },
    });
    // if it was successful
    if (data?.resetPassword?.success && data.resetPassword.token) {
      setToken(data.resetPassword.token);
      history.push('/app');
    }
  };

  if (!token) {
    // if user came from somewhere other than the actual email, just probably wrong address
    return <Redirect to="/" />;
  }

  return (
    <AuthContainer onSubmit={handleSubmit(handle)}>
      <TextField
        name="password"
        type="password"
        placeholder="password"
        ref={register({ required: 'Password is requried' })}
      />
      {errors.password?.message}
      <TextField
        name="repeatPassword"
        type="password"
        placeholder="Repeat password"
        ref={register({
          validate: (value) => value === password.current || 'The passwords do not match',
        })}
      />
      {errors.repeatPassword?.message}
      {data?.resetPassword?.message}
      <Button type="submit" label="Reset password" disabled={loading} primary />
      <Link to={'/forgotPassword'}>Try another email address</Link>
      <Link to={'/login'}>Login</Link>
      <Link to={'/register'}>Not a user? Create account</Link>
    </AuthContainer>
  );
};
