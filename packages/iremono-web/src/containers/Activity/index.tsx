import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styled from 'styled-components';
import { Box, List, ListItemButton } from '@mui/material';
import { useUIContext } from '@/contexts/ui-context';
import { PopupMenu } from '@/components/PopupMenu';
import { usePopupMenu } from '@/hooks/use-popup-menu';

export const Activity = (): JSX.Element => {
  const { pathname } = useLocation();
  const { toggleSidebarPosition } = useUIContext();
  const [openMenu, anchorEl, handleOpenMenu, handleCloseMenu] = usePopupMenu();

  const links = [
    {
      icon: <FileCopyOutlinedIcon sx={{ color: pathname.includes('/folders') ? 'primary.main' : 'common.grey' }} />,
      path: '/folders',
    },
    {
      icon: <LockOutlinedIcon sx={{ color: pathname.includes('/crypto-folders') ? 'primary.main' : 'common.grey' }} />,
      path: '/crypto-folders',
    },
    // {
    //   icon: <MenuBookOutlinedIcon sx={{ color: pathname.includes('/books') ? 'primary.main' : 'common.grey' }} />,
    //   path: '/books',
    // },
    // {
    //   icon: <VideoLibraryOutlinedIcon sx={{ color: pathname.includes('/videos') ? 'primary.main' : 'common.grey' }} />,
    //   path: '/videos',
    // },
    {
      icon: <DeleteOutlineOutlinedIcon sx={{ color: pathname.includes('/trash') ? 'primary.main' : 'common.grey' }} />,
      path: '/trash',
    },
  ];

  return (
    <>
      <Container>
        <MainActivity>
          <ActivityItemList>
            {links.map((link, index) => (
              <Link to={link.path} key={index} style={{ width: '100%' }}>
                <ActivityItem selected={pathname.includes(link.path)}>{link.icon}</ActivityItem>
              </Link>
            ))}
          </ActivityItemList>
        </MainActivity>
        <SubActivity>
          <ActivityItem onClick={(e) => handleOpenMenu(e as any)}>
            <SettingsOutlinedIcon sx={{ color: 'common.grey' }} />
          </ActivityItem>
        </SubActivity>
      </Container>
      <PopupMenu
        menuItems={[
          {
            text: 'Toggle sidebar',
            icon: <ViewSidebarIcon />,
            action: () => {
              toggleSidebarPosition();
              handleCloseMenu();
            },
          },
        ]}
        anchorEl={anchorEl}
        handleClose={handleCloseMenu}
        open={openMenu}
      />
    </>
  );
};

const ColumnFlexBase = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled(ColumnFlexBase)`
  justify-content: space-between;
  height: 100%;
  background-color: ${(props) => props.theme.palette.background.primary};
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
  padding-top: 1rem;
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
