import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { Header } from '@/components/Header';
import { trashService } from '@/services/trash-service';
import { useTrashStore } from '@/store/trash/use-trash-store';
import { TrashItemContextMenu } from './TrashItemContextMenu';
import { FileTrashItem } from './FileTrashItem';
import { FolderTrashItem } from './FolderTrashItem';
import { StorageItemListContainer } from '@/components/StorageItemListContainer';

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
          <Typography sx={{ color: 'text.primary' }} variant="h4" component="h2">
            Trash
          </Typography>
        </>
        <></>
      </Header>

      <StorageItemsContainer>
        <StorageItemListContainer arrangeType="grid" listName="Folders">
          {folderTrashItemList.map((trashItem: any) => (
            <TrashItemContextMenu trashItem={trashItem} key={trashItem.id}>
              <FolderTrashItem folderTrashItem={trashItem} arrangeType="grid" />
            </TrashItemContextMenu>
          ))}
        </StorageItemListContainer>

        <StorageItemListContainer arrangeType="grid" listName="Files">
          {fileTrashItemList.map((trashItem) => (
            <TrashItemContextMenu trashItem={trashItem} key={trashItem.id}>
              <FileTrashItem fileTrashItem={trashItem} arrangeType="grid" />
            </TrashItemContextMenu>
          ))}
        </StorageItemListContainer>
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
