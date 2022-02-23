import React, { useState } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/system';
import { ResizablePanel } from '@/components/ResizablePanel';
import { Sidebar } from '@/components/Sidebar';
import { Activity } from '@/containers/Activity';
import { Explore } from '@/containers/Explore';
import { MainTop } from '@/containers/MainTop';
import { MainBottom } from '@/containers/MainBottom';
import { Avatar } from '@mui/material';
import { stringToColor } from '@/utils/string-to-color';
import { useAuthStore } from '@/store/auth/use-auth-store';
import { Header } from '@/components/Header';

export const Home = () => {
  const [isSidebarPositionLeft, setsSidebarPositionLeft] = useState(true);
  const muiTheme = useTheme();
  const { user } = useAuthStore();

  return (
    <HomeContainer>
      <ResizablePanel defaultLeftSizeInRatio={isSidebarPositionLeft ? 25 : 75} resizerColor={muiTheme.palette.divider}>
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
                  <Avatar sx={{ bgcolor: stringToColor(user.email), color: 'white', width: '36px', height: '36px' }}>
                    {user.email[0].toUpperCase()}
                  </Avatar>
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
