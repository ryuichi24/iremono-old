import { Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { ListItemContainer } from '../ListItemCard/ListItemContainer';

interface Props {
  arrangeType: 'grid' | 'list';
  children: React.ReactNode;
}

export const StorageItemListContainer = ({ children, arrangeType }: Props) => {
  const items = React.Children.toArray(children);
  return (
    <>
      <Container>
        {arrangeType === 'grid' ? (
          <>
            <SectionName>{'Folders'}</SectionName>
            <GridItemSection>{items[0]}</GridItemSection>
            <SectionName>{'Files'}</SectionName>
            <GridItemSection>{items[1]}</GridItemSection>
          </>
        ) : (
          <>
            <ListItemContainer>
              <div>
                <Typography sx={{ color: 'text.secondary' }}>Name</Typography>
              </div>
              <div>
                <Typography sx={{ color: 'text.secondary' }}>Last modified</Typography>
              </div>
              <div>
                <Typography sx={{ color: 'text.secondary' }}>File size </Typography>
              </div>
            </ListItemContainer>
            <ListItemSection>{items}</ListItemSection>
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 5rem;
`;

const SectionName = styled(Typography)`
  padding-bottom: 1rem;
  padding-top: 1rem;
  color: ${(props) => props.theme.palette.text.secondary};
`;

const GridItemSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
`;

const ListItemSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
