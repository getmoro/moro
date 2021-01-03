import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './GlobalStyles';
import { theme } from './defaultTheme';

export const Theme: FC<Record<string, never>> = (props) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      {props.children}
    </>
  </ThemeProvider>
);
