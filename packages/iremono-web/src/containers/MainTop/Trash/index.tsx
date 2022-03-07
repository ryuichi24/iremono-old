import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Header } from '@/components/Header';
import { trashService } from '@/services/trash-service';
import { useTrashActions } from '@/store/trash/use-trash-actions';
import { TrashItemContextMenu } from './TrashItemContextMenu';
import { FileTrashItem } from './FileTrashItem';
import { FolderTrashItem } from './FolderTrashItem';
import { StorageItemListContainer } from '@/components/StorageItemListContainer';
import { useUIActions } from '@/store/ui/use-ui-actions';
import { useAppSelector } from '@/store/redux-hooks';
import { storageItemViewModeSelector } from '@/store/ui/ui-slice';
import { fileTrashItemListSelector, folderTrashItemListSelector } from '@/store/trash/trash-slice';

export const Trash = () => {
  const { setTrashItems } = useTrashActions();
  const { toggleStorageItemViewMode } = useUIActions();

  const storageItemViewMode = useAppSelector(storageItemViewModeSelector);
  const folderTrashItemList = useAppSelector(folderTrashItemListSelector);
  const fileTrashItemList = useAppSelector(fileTrashItemListSelector);

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
          <Typography sx={{ color: 'text.primary' }} variant="h5" component="h2">
            Trash
          </Typography>
        </>
        <>
          <div style={{ marginRight: '1rem' }}>
            {storageItemViewMode === 'grid' ? (
              <ViewListIcon onClick={toggleStorageItemViewMode} sx={{ color: 'common.grey' }} />
            ) : (
              <GridViewIcon onClick={toggleStorageItemViewMode} sx={{ color: 'common.grey' }} />
            )}
          </div>
        </>
      </Header>

      <StorageItemsContainer>
        <StorageItemListContainer arrangeType={storageItemViewMode}>
          <>
            {folderTrashItemList.map((trashItem: any) => (
              <TrashItemContextMenu trashItem={trashItem} key={trashItem.id}>
                <FolderTrashItem folderTrashItem={trashItem} arrangeType={storageItemViewMode} />
              </TrashItemContextMenu>
            ))}
          </>
          <>
            {fileTrashItemList.map((trashItem) => (
              <TrashItemContextMenu trashItem={trashItem} key={trashItem.id}>
                <FileTrashItem fileTrashItem={trashItem} arrangeType={storageItemViewMode} />
              </TrashItemContextMenu>
            ))}
          </>
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
