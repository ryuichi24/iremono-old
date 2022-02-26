import React, { useEffect } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { useFoldersStore } from '@/store/folders/use-folders-store';
import { foldersService } from '@/services/folders-service';
import { FolderTreeItem } from './FolderTreeItem';
import { useFilesStore } from '@/store/files/use-files-store';

export const FolderExplore = () => {
  const { folderGroupList, addFolderGroup } = useFoldersStore();
  const { addFileGroup } = useFilesStore();

  useEffect(() => {
    (async () => {
      const rootFolderGroup = folderGroupList.find((group) => group.isRootFolder);

      if (rootFolderGroup) return;

      const rootFolder = await foldersService.get({ folderId: '0' });
      const rootFolderItems = (await foldersService.listItems({ folderId: rootFolder.id })).entries;
      const folders = rootFolderItems.filter((item: any) => item.isFolder);
      const files = rootFolderItems.filter((item: any) => !item.isFolder);

      addFolderGroup({ folderItems: folders, folder: rootFolder, ancestors: [] });
      addFileGroup({ fileItems: files, parentId: rootFolder.id });
    })();
  }, []);

  return (
    <Container>
      {folderGroupList
        .find((group) => group.isRootFolder)
        ?.folderItems?.filter((item) => item.isFolder)
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
