import React, { useEffect } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { useFoldersActions } from '@/store/folders/use-folders-actions';
import { foldersService } from '@/services/folders-service';
import { useFilesActions } from '@/store/files/use-files-actions';
import { useAppSelector } from '@/store/redux-hooks';
import { rootCryptoFolderGroupSelector } from '@/store/folders/folders-slice';
import { CryptoFolderTreeItem } from './CryptoFolderTreeItem';

export const UnlockedCryptoFolderExplore = () => {
  const { addFolderGroup } = useFoldersActions();
  const { addFileGroup } = useFilesActions();

  const rootFolderGroup = useAppSelector(rootCryptoFolderGroupSelector);

  useEffect(() => {
    (async () => {
      if (rootFolderGroup) return;

      const rootFolder = await foldersService.get({ folderId: '0', folderType: 'crypto' });
      const rootFolderItems = (await foldersService.listItems({ folderId: rootFolder.id })).entries;
      const folders = rootFolderItems.filter((item: any) => item.isFolder);
      const files = rootFolderItems.filter((item: any) => !item.isFolder);

      addFolderGroup({ folderItems: folders, folder: rootFolder, ancestors: [] });
      addFileGroup({ fileItems: files, parentId: rootFolder.id });
    })();
  }, []);

  return (
    <Container>
      {rootFolderGroup?.folderItems
        ?.filter((item) => item.isFolder)
        .map((item) => (
          <CryptoFolderTreeItem item={item} key={item.id} />
        ))}
    </Container>
  );
};

const Container = styled(Box)`
  padding: 0.5rem;
  background-color: ${(props) => props.theme.palette.background.primary};
  height: 100%;
`;
