import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Box, Grid, Typography } from '@mui/material';
import { Header } from '@/components/Header';
import { trashService } from '@/services/trash-service';
import { useTrashStore } from '@/store/trash/use-trash-store';
import { TrashItemContextMenu } from './TrashItemContextMenu';
import { FileTrashItem } from './FileTrashItem';
import { FolderTrashItem } from './FolderTrashItem';

export const Trash = () => {
  const { setTrashItems, folderTrashItemList, fileTrashItemList } = useTrashStore();

  useEffect(() => {
    trashService
      .listItems()
      .then((result) => {
        setTrashItems({ trashItems: result.entries });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Header isSubHeader={true}>
        <>
          <div></div>
        </>
        <></>
      </Header>

      <StorageItemsContainer>
        <FolderSection>
          <SectionName>Folders</SectionName>
          <FolderList>
            {folderTrashItemList.map((trashItem: any) => (
              <TrashItemContextMenu trashItem={trashItem} key={trashItem.id}>
                <FolderTrashItem folderTrashItem={trashItem} />
              </TrashItemContextMenu>
            ))}
          </FolderList>
        </FolderSection>
        <FileSection>
          <SectionName>Files</SectionName>
          <FileList container>
            {fileTrashItemList.map((trashItem) => (
              <TrashItemContextMenu trashItem={trashItem} key={trashItem.id}>
                <FileTrashItem fileTrashItem={trashItem} />
              </TrashItemContextMenu>
            ))}
          </FileList>
        </FileSection>
      </StorageItemsContainer>
    </Container>
  );
};

const Container = styled('div')`
  height: 100%;
`;

const StorageItemsContainer = styled('div')`
  overflow: scroll;
  height: 80%;
`;

const FolderSection = styled(Box)`
  padding: 1rem;
`;

const FolderList = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FileSection = styled(Box)`
  padding: 1rem;
`;

const FileList = styled(Grid)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SectionName = styled(Typography)`
  padding-bottom: 0.5rem;
  color: ${(props) => props.theme.palette.text.secondary};
`;
