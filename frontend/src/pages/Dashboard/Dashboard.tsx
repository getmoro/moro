import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { useUserQuery } from '../../graphql/hooks';

const Root = styled.div`
  display: grid;
  grid-gap: 30px;
  margin: auto;
  padding-top: ${({ theme }) => theme.size.xs};
  max-width: calc(${({ theme }) => theme.size.x6l} * 10);
`;

export const Dashboard: FC = () => {
  const { data, error } = useUserQuery();
  console.log(data, error);

  return <Root>This is the dashboard</Root>;
};
