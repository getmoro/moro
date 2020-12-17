import React from 'react';
import styled from 'styled-components/macro';

export type Props = {
  primary?: boolean;
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Root = styled.button<Pick<Props, 'primary'>>`
  line-height: 48px;
  border-radius: 24px;
  color: #fff;
  font-weight: bold;
  border: none;
  background-color: ${({ theme, primary }) =>
    primary ? theme.color.primary : theme.color.secondary};
`;

export const Button = (props: Props) => {
  const { label, ...rest } = props;

  return <Root {...rest}>{label}</Root>;
};
