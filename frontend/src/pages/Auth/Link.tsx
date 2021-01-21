import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink)`
  line-height: ${({ theme }) => theme.size.x5l};
  border-radius: ${({ theme }) => theme.size.x5l};
  text-align: center;
  text-decoration: none;
  border: none;
  color: ${({ theme }) => theme.color.secondary};
  background-color: #fff;
`;
