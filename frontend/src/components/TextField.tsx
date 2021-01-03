import React, { ReactElement, ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components/macro';

type Props = {
  onValueChange?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Root = styled.div`
  line-height: 48px;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 24px;
  font-weight: bold;
  overflow: hidden;
  background-color: #fff;
  border-color: ${({ theme }) => theme.color.secondary};
  border-width: 2px;
  border-style: solid;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  line-height: 48px;
  margin: auto;
  width: 100%;
  outline: none;
  border: none;
  font-weight: bold;
  color: #000;
  overflow-wrap: anywhere;
`;

const TextFieldInnerComp = (
  props: Props,
  ref: ForwardedRef<HTMLInputElement>,
): ReactElement => {
  const { onValueChange, ...rest } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    onValueChange && onValueChange(event.target.value);

  return (
    <Root>
      <Input ref={ref} onChange={onValueChange && handleChange} {...rest} />
    </Root>
  );
};

export const TextField = forwardRef<HTMLInputElement, Props>(TextFieldInnerComp);
