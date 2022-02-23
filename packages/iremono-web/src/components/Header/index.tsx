import { stringToColor } from '@/utils/string-to-color';
import { AppBar, Avatar, Box, Toolbar } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  isSubHeader?: boolean;
}

export const Header = ({ children, isSubHeader = false }: Props) => {
  const [left, right] = React.Children.toArray(children);

  return (
    <>
      {isSubHeader ? (
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <HeaderItemsContainer>{left}</HeaderItemsContainer>
          <HeaderItemsContainer>{right}</HeaderItemsContainer>
        </Toolbar>
      ) : (
        <Navbar position="static">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <HeaderItemsContainer>{left}</HeaderItemsContainer>
            <HeaderItemsContainer>{right}</HeaderItemsContainer>
          </Toolbar>
        </Navbar>
      )}
    </>
  );
};

const Navbar = styled(AppBar)`
  background-color: ${(props) => props.theme.palette.background.secondary};
  box-shadow: ${(props) => props.theme.shadows[7]};
`;

const HeaderItemsContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 12px;
`;
