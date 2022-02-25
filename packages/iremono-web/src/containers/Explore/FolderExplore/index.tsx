import React, { useEffect } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { useFoldersStore } from '@/store/folders/use-folders-store';
import { foldersService } from '@/services/folders-service';
import { FolderTreeItem } from './FolderTreeItem';

export const FolderExplore = () => {
  const { folderGroupList, addFolderGroup } = useFoldersStore();

  useEffect(() => {
    const rootFolderGroup = folderGroupList.find((group) => group.parentId === '0');
    if (!rootFolderGroup)
      foldersService.listItems({ folderId: '0' }).then((result) => {
        addFolderGroup({ folderItems: result.entries, parentId: '0' });
      });
  }, []);

  return (
    <Container>
      {folderGroupList
        .find((group) => group.parentId === '0')
        ?.folderItems.filter((item) => item.isFolder)
        .map((item) => (
          <FolderTreeItem item={item} key={item.id} />
        ))}
    </Container>
  );
};

const Container = styled(Box)`
  padding: 0.5rem;
  background-color: ${(props) => props.theme.palette.background.secondary};
  height: 100%;
`;
