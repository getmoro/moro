import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { CheckedIcon, UncheckedIcon } from './Checkbox/Icons';

export type Props = {
  label: string;
  dataTestId?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CheckboxRoot = styled.label<Pick<Props, 'disabled'>>`
  display: inline-grid;
  grid-template-columns:
    calc(${({ theme }) => theme.size.l} + ${({ theme }) => theme.size.xs})
    auto;
  padding: ${({ theme }) => theme.size.xs};

  outline: none;
  will-change: background-color, box-shadow;

  ::-moz-focus-inner {
    border: 0;
  }

  ${CheckedIcon} {
    display: none;
  }

  input:checked ~ ${UncheckedIcon} {
    display: none;
  }

  input:checked ~ ${CheckedIcon} {
    display: block;
  }
`;

const Input = styled.input`
  position: absolute;
  outline: none;
  opacity: 0;
`;

const Label = styled.span`
  align-self: center;
`;

export const Checkbox: FC<Props> = ({ label, dataTestId, className, ...props }) => (
  <CheckboxRoot
    aria-label={label}
    data-testid={dataTestId}
    disabled={props.disabled}
    className={className}
  >
    <Input type="checkbox" {...props} />
    <CheckedIcon />
    <UncheckedIcon />
    <Label>{label}</Label>
  </CheckboxRoot>
);
