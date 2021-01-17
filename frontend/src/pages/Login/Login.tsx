import React, { FC, useState } from 'react';
import styled from 'styled-components/macro';
import useFetch from 'use-http';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { Checkbox } from '../../components/Checkbox';
import { emailRegex, SERVER_ADDRESS } from '../../utils/constants';
import { useRememberMe } from '../../utils/hooks/useRememberMe';
import { useToken } from '../../utils/hooks/useToken';

const Root = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  margin: auto;
  width: 90vw;
  max-width: 30rem;
  height: 400px;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
`;

const LogoContainer = styled.div`
  margin: 20px auto;
  min-width: 8rem;
  min-height: 8rem;
`;

const Copyright = styled.span`
  color: #ddd;
  text-align: center;
`;

export type Login = {
  email: string;
  password: string;
};

export const Login: FC = () => {
  const history = useHistory();
  const { post, loading, error } = useFetch(SERVER_ADDRESS);
  const { handleSubmit, register, errors } = useForm<Login>();
  const [message, setMessage] = useState<string | null>(null);
  const [remember, setRemember] = useRememberMe(false);
  const [, setToken] = useToken();

  const handleSignIn = async (values: Login): Promise<void> => {
    const result = await post('/login', values);
    if (!result) {
      setMessage('Unable to connect to Moro');
    } else if (result.message) {
      setMessage(result.message);
    } else if (result.token) {
      setToken(result.token);
      history.push('/app');
    }
  };

  const handleRememberMe = (): void => setRemember(!remember);

  return (
    <Root>
      <Form onSubmit={handleSubmit(handleSignIn)}>
        <Container>
          <LogoContainer>{/* <Logo /> */}</LogoContainer>
          <TextField
            name="email"
            placeholder="email"
            ref={register({
              required: 'Email is requried to login',
              pattern: {
                message: 'Email is not entered correctly',
                value: emailRegex,
              },
            })}
          />
          {errors.email && errors.email.message}
          <TextField
            name="password"
            type="password"
            placeholder="password"
            ref={register({ required: 'Password is requried to login' })}
          />
          {errors.password && errors.password.message}
          {/* <span>Forgot your password?</span> */}
          <Checkbox label="Remember me" onChange={handleRememberMe} checked={remember} />
        </Container>
        {message}
        {error}
        <Button type="submit" label="Sign in" disabled={loading} />
      </Form>
      <Copyright>&copy; Moro 2020</Copyright>
    </Root>
  );
};
