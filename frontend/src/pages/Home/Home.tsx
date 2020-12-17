import React from 'react';
import styled from 'styled-components/macro';

const Root = styled.div`
  display: grid;
  grid-gap: 30px;
  margin: auto;
  padding-top: ${({ theme }) => theme.size.xs};
  max-width: calc(${({ theme }) => theme.size.x6l} * 10);
`;

export const Home = () => (
  <Root>
    This is the homepage
  </Root>
);
