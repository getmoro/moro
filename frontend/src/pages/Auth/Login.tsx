import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { Checkbox } from '../../components/Checkbox';
import { emailRegex } from '../../utils/constants';
import { useRememberMe } from '../../utils/rememberMe';
import { setToken } from '../../utils/token';
import { CredentialsInput, useLoginMutation } from '../../graphql/hooks';
import { AuthContainer } from './AuthContainer';
import { Link } from './Link';

export const Login: FC = () => {
  const history = useHistory(); // used to redirect to app after login
  const { handleSubmit, register, errors } = useForm<CredentialsInput>(); // handles form values
  const [remember, setRemember] = useRememberMe(false); // preserves rememberMe state in the localStorage
  const [loginUserMutation, { loading, data }] = useLoginMutation(); // request handler

  const handle = async (values: CredentialsInput): Promise<void> => {
    const { data } = await loginUserMutation({ variables: { credentials: values } });
    // if it was successful
    if (data && data.login) {
      if (data.login.success && data.login.token) {
        setToken(data.login.token);
        history.push('/app');
      }
    }
  };

  const handleRememberMe = (): void => setRemember(!remember);

  return (
    <AuthContainer onSubmit={handleSubmit(handle)}>
      <TextField
        name="email"
        placeholder="email"
        ref={register({
          required: 'Email is required to login',
          pattern: {
            message: 'Email is not entered correctly',
            value: emailRegex,
          },
        })}
      />
      {errors.email?.message}
      <TextField
        name="password"
        type="password"
        placeholder="password"
        ref={register({ required: 'Password is requried to login' })}
      />
      {errors.password?.message}
      <Checkbox label="Remember me" onChange={handleRememberMe} checked={remember} />
      {data?.login?.message}
      <Button type="submit" label="Sign in" disabled={loading} primary />
      <Link to={'/forgotPassword'}>Forgot your password?</Link>
      <Link to={'/register'}>Not a user? Create account</Link>
    </AuthContainer>
  );
};
