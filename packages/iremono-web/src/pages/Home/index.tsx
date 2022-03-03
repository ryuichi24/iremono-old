import React, { useState } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Avatar, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import { ResizablePanel } from '@/components/ResizablePanel';
import { Sidebar } from '@/components/Sidebar';
import { Activity } from '@/containers/Activity';
import { Explore } from '@/containers/Explore';
import { MainTop } from '@/containers/MainTop';
import { MainBottom } from '@/containers/MainBottom';
import { useAuthStore } from '@/store/auth/use-auth-store';
import { Header } from '@/components/Header';
import { PopupMenu } from '@/components/PopupMenu';
import { usePopupMenu } from '@/hooks/use-popup-menu';
import { authService } from '@/services/auth-service';

export const Home = () => {
  const [isSidebarPositionLeft, setsSidebarPositionLeft] = useState(true);
  const [openMenu, anchorEl, handleOpenMenu, handleCloseMenu] = usePopupMenu();
  const muiTheme = useTheme();
  const { user, clearAuth } = useAuthStore();

  return (
    <HomeContainer>
      <ResizablePanel defaultLeftSizeInRatio={isSidebarPositionLeft ? 20 : 80} resizerColor={muiTheme.palette.divider}>
        {isSidebarPositionLeft && (
          <SidePanel>
            <Sidebar>
              <Activity />
              <Explore />
            </Sidebar>
          </SidePanel>
        )}
        <MainPanelContainer>
          <ResizablePanel defaultLeftSizeInRatio={70} isVertical={true} resizerColor={muiTheme.palette.divider}>
            <MainTopPanel>
              <Header>
                <></>
                <>
                  <Avatar
                    sx={{ bgcolor: 'primary.main', color: 'white', width: '36px', height: '36px' }}
                    onClick={handleOpenMenu as any}
                  >
                    {user.email[0].toUpperCase()}
                  </Avatar>

                  <PopupMenu
                    menuItems={[
                      {
                        text: <Typography sx={{ color: 'error.main' }}>{'Sign out'}</Typography>,
                        icon: <LogoutIcon sx={{ color: 'error.main' }} fontSize="small" />,
                        action: async () => {
                          await authService.signOut();
                          clearAuth();
                          handleCloseMenu();
                        },
                      },
                    ]}
                    anchorEl={anchorEl}
                    handleClose={handleCloseMenu}
                    open={openMenu}
                  />
                </>
              </Header>
              <MainTop />
            </MainTopPanel>
            <MainBottomPanel>
              <MainBottom />
            </MainBottomPanel>
          </ResizablePanel>
        </MainPanelContainer>
        {!isSidebarPositionLeft && (
          <SidePanel>
            <Sidebar swap={true}>
              <Activity />
              <Explore />
            </Sidebar>
          </SidePanel>
        )}
      </ResizablePanel>
    </HomeContainer>
  );
};

const Panel = styled(Box)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const HomeContainer = styled(Panel)`
  display: flex;
`;

const MainPanelContainer = styled(Panel)``;

const MainTopPanel = styled(Panel)``;

const MainBottomPanel = styled(Panel)``;

const SidePanel = styled(Panel)``;
