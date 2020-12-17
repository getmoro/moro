import React from 'react';
import styled from 'styled-components/macro';
import { useForm } from 'react-hook-form';
import { Button } from 'components/Button';
import { TextField } from 'components/TextField';

const Root = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  text-align: center;
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
  text-align: center;
`;

const LogoContainer = styled.div`
  margin: 20px auto;
  min-width: 8rem;
  min-height: 8rem;
`;

const Copyright = styled.span`
  color: #ddd;
`;

export type Login = {
  username: string;
  password: string;
};

export const Login = () => {
  const { handleSubmit, register, errors } = useForm<Login>();

  const handleSignIn = (values: Login) => {
    console.log(values);
  };

  return (
    <Root>
      <Form onSubmit={handleSubmit(handleSignIn)}>
        <Container>
          <LogoContainer>
            {/* <Logo /> */}
          </LogoContainer>
          <TextField
            name="username"
            placeholder="username"
            ref={register({
              validate: (value) => value.length > 0,
            })}
          />
          {errors.username && errors.username.message}
          <TextField
            name="password"
            type="password"
            placeholder="password"
            ref={register({
              validate: (value) => value.length > 0,
            })}
          />
          {errors.password && errors.password.message}
          {/* <span>Forget your password?</span> */}
        </Container>
        <Button type="submit" label="Sign in" />
      </Form>
      <Copyright>&copy; Moro 2020</Copyright>
    </Root>
  );
};
