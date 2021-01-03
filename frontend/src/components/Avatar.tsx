import React, { FC } from 'react';
import styled from 'styled-components/macro';

export type Props = {
  image: string;
};

const Root = styled.div`
  width: ${({ theme }) => theme.size.x5l};
  height: ${({ theme }) => theme.size.x5l};
  overflow: hidden;
  border-radius: 50%;
`;

const Image = styled.img`
  width: ${({ theme }) => theme.size.x5l};
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Avatar: FC<Props> = (props) => (
  <Root>
    <Image src={props.image} />
  </Root>
);
