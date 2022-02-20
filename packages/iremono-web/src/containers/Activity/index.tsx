import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import styled from 'styled-components';
import { Avatar, Box, List, ListItemButton } from '@mui/material';
import { stringToColor } from '@/utils/string-to-color';

interface Props {
  user: any;
}

export const Activity = ({ user }: Props): JSX.Element => {
  const { pathname } = useLocation();

  const links = [
    {
      icon: <FileCopyOutlinedIcon color="primary" />,
      path: '/folders',
    },
    {
      icon: <MenuBookOutlinedIcon color="primary" />,
      path: '/books',
    },
    {
      icon: <VideoLibraryOutlinedIcon color="primary" />,
      path: '/videos',
    },
    {
      icon: <DeleteOutlineOutlinedIcon color="primary" />,
      path: '/trash',
    },
  ];

  return (
    <Container>
      <MainActivity>
        <ActivityItemList>
          {links.map((link, index) => (
            <Link to={link.path} key={index} style={{ width: '100%' }}>
              <ActivityItem selected={pathname === link.path}>{link.icon}</ActivityItem>
            </Link>
          ))}
        </ActivityItemList>
      </MainActivity>
      <SubActivity>
        <ActivityItem>
          <Avatar sx={{ bgcolor: stringToColor(user.email) }}>{user.email[0].toUpperCase()}</Avatar>
        </ActivityItem>
        <ActivityItem>
          <SettingsOutlinedIcon color="primary" />
        </ActivityItem>
      </SubActivity>
    </Container>
  );
};

const ColumnFlexBase = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled(ColumnFlexBase)`
  justify-content: space-between;
  padding-top: 1rem;
  height: 100%;
`;

const MainActivity = styled(ColumnFlexBase)`
  gap: 1rem;
  width: 100%;
`;

const SubActivity = styled(ColumnFlexBase)`
  gap: 1rem;
  padding-bottom: 2rem;
  position: relative;
  width: 100%;
`;

const ActivityItemList = styled(List)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
`;

const ActivityItem = styled(ListItemButton)`
  display: flex;
  flex-direction: column;
  width: 100%;

  &.Mui-selected {
    border-left: 4px solid ${(props) => props.theme.palette.primary.main};
  }

  & svg {
    width: 28px;
    height: 28px;
  }
`;
