import React, { FC } from 'react';
import styled from 'styled-components/macro';

export type Props = {
  primary?: boolean;
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Root = styled.button<Pick<Props, 'primary'>>`
  line-height: ${({ theme }) => theme.size.x5l};
  border-radius: ${({ theme }) => theme.size.x5l};
  font-weight: bold;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ theme, primary, disabled }) => {
    if (disabled) {
      return theme.color.disabled;
    }
    if (primary) {
      return theme.color.primary;
    } else {
      return theme.color.secondary;
    }
  }};
`;

export const Button: FC<Props> = (props) => {
  const { label, ...rest } = props;

  return <Root {...rest}>{label}</Root>;
};
