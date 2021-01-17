import React, { FC, useState } from 'react';
import styled from 'styled-components/macro';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { Checkbox } from '../../components/Checkbox';
import { emailRegex } from '../../utils/constants';
import { useRememberMe } from '../../utils/hooks/useRememberMe';
import { useToken } from '../../utils/hooks/useToken';
import { gql, useMutation } from '@apollo/client';

const REGISTER = gql`
  mutation register($user: UserInput!) {
    register(user: $user) {
      token
    }
  }
`;

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

type RegisterType = {
  name: string;
  email: string;
  password: string;
};

export const Register: FC = () => {
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm<RegisterType>();
  const [message, setMessage] = useState<string | null>(null);
  const [remember, setRemember] = useRememberMe(false);
  const [, setToken] = useToken();
  const [registerUser, { loading }] = useMutation(REGISTER, {
    update(cache, { data }) {
      if (data && data.register) {
        if (data.register.success) {
          setToken(data.register.token);
          history.push('/app');
        } else {
          setMessage(data.register.message);
        }
      }
    },
  });

  const handleSignIn = (values: RegisterType): void => {
    registerUser({ variables: { user: values } });
  };

  const handleRememberMe = (): void => setRemember(!remember);

  return (
    <Root>
      <Form onSubmit={handleSubmit(handleSignIn)}>
        <Container>
          <LogoContainer>{/* <Logo /> */}</LogoContainer>
          <TextField
            name="name"
            placeholder="name"
            ref={register({
              required: 'Name is required to register',
            })}
          />
          {errors.name && errors.name.message}
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
          {errors.email && errors.email.message}
          <TextField
            name="password"
            type="password"
            placeholder="password"
            ref={register({ required: 'Password is requried to register' })}
          />
          {errors.password && errors.password.message}
          {/* <span>Forgot your password?</span> */}
          <Checkbox label="Remember me" onChange={handleRememberMe} checked={remember} />
        </Container>
        {message}
        {/* {error} */}
        <Button type="submit" label="Sign in" disabled={loading} />
      </Form>
    </Root>
  );
};
