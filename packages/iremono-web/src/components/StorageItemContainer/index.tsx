import { Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

interface Props {
  arrangeType: 'grid' | 'list';
  listName: string;
  children: React.ReactNode;
}

export const StorageItemListContainer = ({ children, arrangeType, listName }: Props) => {
  const items = React.Children.toArray(children);
  return (
    <Container>
      {arrangeType === 'grid' && <SectionName>{listName}</SectionName>}
      <ItemSection arrangeType={arrangeType}>{items}</ItemSection>
    </Container>
  );
};

const Container = styled.div`
  padding-left: 1rem;
`;

const SectionName = styled(Typography)`
  padding-bottom: 1rem;
  padding-top: 1rem;
  color: ${(props) => props.theme.palette.text.secondary};
`;

const ItemSection = styled.div<{ arrangeType: string }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => {
    if (props.arrangeType === 'grid') return 'row';
    if (props.arrangeType === 'list') return 'column';

    return 'row';
  }};
  gap: 1rem;
`;
