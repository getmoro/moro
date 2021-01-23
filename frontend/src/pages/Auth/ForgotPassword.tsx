import React, { FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { emailRegex } from '../../utils/constants';
import { EmailInput, useForgotPasswordMutation } from '../../graphql/hooks';
import { AuthContainer } from './AuthContainer';
import { Link } from './Link';
import { useRedirectToResetPasswordPage } from './useResetPasswordRouter';

export const ForgotPassword: FC = () => {
  const redirectToResetPasswordPage = useRedirectToResetPasswordPage(); // used to redirect to ResetPassword component after submit and sending email as a location state
  const { handleSubmit, register, errors, watch } = useForm<EmailInput>(); // handles form values
  const email = useRef<string | null | undefined>(''); // to use form watch and get email field value to send it for ResetPassword component on the success redirect
  email.current = watch('email', '');
  const [forgotPasswordMutation, { loading, data }] = useForgotPasswordMutation(); // request handler

  const handle = async (values: EmailInput): Promise<void> => {
    const { data } = await forgotPasswordMutation({ variables: { credentials: values } });
    // if it was successful
    if (email.current && data?.forgotPassword?.success) {
      redirectToResetPasswordPage(email.current);
    }
  };

  return (
    <AuthContainer onSubmit={handleSubmit(handle)}>
      <TextField
        name="email"
        placeholder="email"
        ref={register({
          required: 'Email is required to recover your account',
          pattern: {
            message: 'Email is not entered correctly',
            value: emailRegex,
          },
        })}
      />
      {errors.email?.message}
      {data?.forgotPassword?.message}
      <Button type="submit" label="Recover account" disabled={loading} primary />
      <Link to={'/login'}>Login</Link>
      <Link to={'/register'}>Not a user? Create account</Link>
    </AuthContainer>
  );
};
