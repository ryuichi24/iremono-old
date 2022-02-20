import { Box, Divider } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  swap?: boolean;
  leftWidth?: string;
}

export const Sidebar = ({ children, swap = false, leftWidth = '60px' }: Props) => {
  const [left, right] = React.Children.toArray(children);

  return (
    <SidebarContainer>
      {swap ? (
        <>
          <RightContainer>{right}</RightContainer>
          <Divider orientation="vertical" />
          <LeftContainer leftWidth={leftWidth}>{left}</LeftContainer>
        </>
      ) : (
        <>
          <LeftContainer leftWidth={leftWidth}>{left}</LeftContainer>
          <Divider orientation="vertical" />
          <RightContainer>{right}</RightContainer>
        </>
      )}
    </SidebarContainer>
  );
};

const SidebarContainer = styled(Box)`
  display: flex;
  height: 100%;
`;

const LeftContainer = styled(Box)<{ leftWidth?: string }>`
  height: 100%;
  width: ${(props) => props.leftWidth || '60px'};
`;

const RightContainer = styled(Box)`
  height: 100%;
  flex: 1;
`;
