import React, { FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRegisterMutation, UserInput } from '../../graphql/hooks';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { Checkbox } from '../../components/Checkbox';
import { emailRegex } from '../../utils/constants';
import { useRememberMe } from '../../utils/rememberMe';
import { setToken } from '../../utils/token';
import { AuthContainer } from './AuthContainer';
import { Link } from './Link';

type RegisterFormType = UserInput & { repeatPassword: string };

export const Register: FC = () => {
  const history = useHistory(); // used to redirect to app after signup
  const { handleSubmit, register, errors, watch } = useForm<RegisterFormType>(); // handles form values
  const password = useRef<string | null | undefined>(''); // to use form watch and get password field value to compare it with repeatPassword
  password.current = watch('password', '');
  const [remember, setRemember] = useRememberMe(false); // preserves rememberMe state in the localStorage
  const [registerUserMutation, { loading, data }] = useRegisterMutation(); // request handler

  const handle = async (values: RegisterFormType): Promise<void> => {
    // remove repeatPassword from values that we sent in the request
    const { repeatPassword, ...user } = values;
    const { data } = await registerUserMutation({ variables: { user } });
    // if it was successful
    if (data && data.register) {
      if (data.register.success && data.register.token) {
        setToken(data.register.token);
        history.push('/app');
      }
    }
  };

  const handleRememberMe = (): void => setRemember(!remember);

  return (
    <AuthContainer onSubmit={handleSubmit(handle)}>
      <TextField
        name="name"
        placeholder="name"
        ref={register({
          required: 'Name is required to register',
        })}
      />
      {errors.name?.message}
      <TextField
        name="email"
        placeholder="email"
        ref={register({
          required: 'Email is required to register',
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
      <Checkbox label="Remember me" onChange={handleRememberMe} checked={remember} />
      {data?.register?.message}
      <Button type="submit" label="Create Account" disabled={loading} primary />
      <Link to={'/login'}>Already have an acount? Login</Link>
    </AuthContainer>
  );
};
