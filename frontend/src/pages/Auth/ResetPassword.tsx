import React, { FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { NewPasswordInput, useResetPasswordMutation } from '../../graphql/hooks';
import { AuthContainer } from './AuthContainer';
import { Link } from './Link';
import { useResetPasswordLocationState } from './useResetPasswordRouter';

type ResetPasswordFormType = Omit<NewPasswordInput, 'email'> & { repeatPassword: string };

export const ResetPassword: FC = () => {
  const history = useHistory(); // used to redirect to app after successful password reset
  const email = useResetPasswordLocationState(); // forgotPasword page will redirect users to here and sends the entered email as a location state. We need this to send it to the server.

  const { handleSubmit, register, errors, watch } = useForm<ResetPasswordFormType>(); // handles form values
  const password = useRef<string | null | undefined>(''); // to use form watch and get password field value to compare it with repeatPassword
  password.current = watch('password', '');
  const [resetPasswordMutation, { loading, data }] = useResetPasswordMutation(); // request handler

  const handle = async (values: ResetPasswordFormType): Promise<void> => {
    const { repeatPassword, ...credentials } = values;
    if (!email) {
      // this actually always exists, because we would redirect user to forgetPassword otherwise
      return;
    }

    const { data } = await resetPasswordMutation({
      variables: { credentials: { ...credentials, email } },
    });
    // if it was successful
    if (data && data.resetPassword) {
      if (data.resetPassword.success) {
        history.push('/app');
      }
    }
  };

  if (!email) {
    // if user came from somewhere other than forgotPassword page, we can't reset their password
    return <Redirect to="/forgotPassword" />;
  }

  return (
    <AuthContainer onSubmit={handleSubmit(handle)}>
      <TextField
        name="token"
        placeholder="token"
        ref={register({
          maxLength: {
            value: 6,
            message: 'Token is a six digit number',
          },
          minLength: {
            value: 6,
            message: 'Token is a six digit number',
          },
        })}
      />
      {errors.token?.message}
      <TextField
        name="password"
        type="password"
        placeholder="password"
        ref={register({ required: 'Password is requried to register' })}
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
      <Button type="submit" label="Recover account" disabled={loading} primary />
      <Link to={'/forgotPassword'}>Try another email address</Link>
      <Link to={'/login'}>Login</Link>
      <Link to={'/register'}>Not a user? Create account</Link>
    </AuthContainer>
  );
};
