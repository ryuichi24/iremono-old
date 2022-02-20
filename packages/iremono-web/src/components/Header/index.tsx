import { stringToColor } from '@/utils/string-to-color';
import { AppBar, Avatar, Box, Toolbar } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  user: any;
}

export const Header = ({ children, user }: Props) => {
  const [left, right] = React.Children.toArray(children);

  return (
    <>
      <Navbar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <HeaderItemsContainer>{left}</HeaderItemsContainer>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <HeaderItemsContainer>{right}</HeaderItemsContainer>

            <Avatar sx={{ bgcolor: stringToColor(user.email), color: 'white', width: '36px', height: '36px' }}>
              {user.email[0].toUpperCase()}
            </Avatar>
          </Box>
        </Toolbar>
      </Navbar>
    </>
  );
};

const Navbar = styled(AppBar)`
  background-color: ${(props) => props.theme.palette.background.paper};
  box-shadow: ${(props) => props.theme.shadows[7]};
`;

const HeaderItemsContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`;
