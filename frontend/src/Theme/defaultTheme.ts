export const theme = {
  size: {
    x4s: '0.125rem' /* 2px */,
    x3s: '0.25rem' /* 4px */,
    x2s: '0.375rem' /* 6px */,
    xs: '0.5rem' /* 8px */,
    s: '0.75rem' /* 12px */,
    m: '1rem' /* 16px */,
    l: '1.25rem' /* 20px */,
    xl: '1.5rem' /* 24px */,
    x2l: '1.75rem' /* 28px */,
    x3l: '2rem' /* 32px */,
    x4l: '2.5rem' /* 40px */,
    x5l: '3rem' /* 48px */,
    x6l: '4rem' /* 64px */,
  },
  color: {
    primary: '#7CAC9A',
    secondary: '#08415c',
    warn: '#e26d5a',
    error: '#ff6361',
    text: '#fff',
  },
  radius: {
    s: '3px',
    m: '5px',
    l: '7px',
  },
  shadow: {
    primary: '0 0.2rem 0.5rem rgba(103, 110, 144, 0.2)',
    secondary:
      '0 0.2rem 0.5rem rgba(103, 110, 144, 0.2), 0 2rem 2.5rem -1rem rgba(103, 110, 144, 0.3)',
  },
  font: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
};

type CustomTheme = typeof theme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends CustomTheme {}
}
