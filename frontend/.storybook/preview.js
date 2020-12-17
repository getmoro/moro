import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Theme } from 'Theme';

export const decorators = [
  (Story) => (
    <Theme>
      <Story />
    </Theme>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
