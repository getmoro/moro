import React, { FC } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Reset as ResetStyles } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    font-family: ${({ theme }) => theme.font};
  }
`;

export const GlobalStyles: FC<any> = () => (
  <>
    <ResetStyles />
    <GlobalStyle />
  </>
);
