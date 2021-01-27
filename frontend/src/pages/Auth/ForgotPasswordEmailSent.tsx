import React, { FC, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from '../../components/Button';
import { useForgotPasswordMutation } from '../../graphql/hooks';
import { AuthContainer } from './AuthContainer';
import { Link } from './Link';
import { useEmailSentLocationState } from './useEmailSentRouter';

export const ForgotPasswordEmailSent: FC = () => {
  const email = useEmailSentLocationState(); // forgotPasword page will redirect users to here and sends the entered email as a location state.
  const [forgotPasswordMutation, { loading, data }] = useForgotPasswordMutation({
    errorPolicy: 'all',
  }); // request handler

  const handle = (event: FormEvent): void => {
    event.preventDefault();
    if (!email) return;
    forgotPasswordMutation({
      variables: { credentials: { email } },
    });
  };

  if (!email) {
    // if user came from somewhere other than forgotPassword page, we can't reset their password
    return <Redirect to="/forgotPassword" />;
  }

  return (
    <AuthContainer onSubmit={handle}>
      <div>An email with a link to reset your password sent to {email}.</div>
      <div>You can continue from there.</div>
      <div>{data?.forgotPassword?.message}</div>
      <Button type="submit" label="Resend email" disabled={loading} primary />
      <Link to={'/forgotPassword'}>Try another email address</Link>
      <Link to={'/login'}>Login</Link>
      <Link to={'/register'}>Not a user? Create account</Link>
    </AuthContainer>
  );
};
