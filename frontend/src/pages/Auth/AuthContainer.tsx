import React, { FC } from 'react';
import styled from 'styled-components/macro';

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
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 8rem;
  min-height: 8rem;
`;

const Copyright = styled.span`
  padding-top: ${({ theme }) => theme.size.m};
  color: #ddd;
  text-align: center;
`;

type Props = {
  onSubmit: React.FormEventHandler;
};

export const AuthContainer: FC<Props> = (props) => (
  <Root>
    <Form onSubmit={props.onSubmit}>
      <Container>
        <LogoContainer>Moro</LogoContainer>
        {props.children}
      </Container>
    </Form>
    <Copyright>&copy; Moro 2020</Copyright>
  </Root>
);
