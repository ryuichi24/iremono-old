import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { formatBytes } from '@iremono/util/dist/format-bytes';
import { Header } from '@/components/Header';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { foldersService } from '@/services/folders-service';
import { useFoldersStore } from '@/store/folders/use-folders-store';
import { useFilesStore } from '@/store/files/use-files-store';
import { PopupMenu } from '@/components/PopupMenu';
import { usePopupMenu } from '@/hooks/use-popup-menu';
import { NewFolderForm } from './NewFolderForm';
import { useModal } from '@/hooks/use-modal';
import { Uploader } from '@/components/Uploader';
import { filesService } from '@/services/files-service';
import { StorageItemContextMenu } from './StorageItemContextMenu';
import { FileItem } from './FileItem';
import { FolderItem } from './FolderItem';
import { FolderPathNav } from './FolderPathNav';
import { useSelectedStore } from '@/store/selected/use-selected-store';
import { useUploadsStore } from '@/store/uploads/use-uploads-store';
import { StorageItemListContainer } from '@/components/StorageItemListContainer';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useUIStore } from '@/store/ui/use-ui-store';

export const Folders = () => {
  const params = useParams<{ id: string }>();
  const currentFolderId = params.id || '0';

  const [openNewFolderForm, handleOpenNewFolderForm, handleCloseNewFolderForm] = useModal();
  const fileUploaderRef: React.Ref<HTMLInputElement> = useRef(null);
  const [openMenu, anchorEl, handleOpenMenu, handleCloseMenu] = usePopupMenu();
  const { addFolderGroup, folderGroupList } = useFoldersStore();
  const { addFileGroup, addOneFileItem, fileGroupList } = useFilesStore();
  const { setSelectedCurrentFolder, selectedCurrentFolder } = useSelectedStore();
  const { addUploadItem, updateUploadItem } = useUploadsStore();
  const { storageItemViewMode, toggleStorageItemViewMode } = useUIStore();

  const menuItems = [
    {
      text: 'New Folder',
      icon: <CreateNewFolderIcon fontSize="small" />,
      action: () => {
        handleCloseMenu();
        handleOpenNewFolderForm();
      },
    },
    {
      text: 'Upload File',
      icon: <UploadFileIcon fontSize="small" />,
      action: () => {
        handleCloseMenu();
        fileUploaderRef.current?.click();
      },
    },
    {
      text: 'Upload Folder',
      icon: <DriveFolderUploadIcon fontSize="small" />,
      action: () => console.log('upload folder'),
    },
  ];

  useEffect(() => {
    (async () => {
      const currentFolder = await foldersService.get({ folderId: currentFolderId });
      setSelectedCurrentFolder({ selectedCurrentFolder: currentFolder });

      const currentFolderGroup = folderGroupList.find((group) => group.parentId === currentFolder.id);

      if (currentFolderGroup) return;

      const currentFolderItems = (await foldersService.listItems({ folderId: currentFolder.id })).entries;
      const folders = currentFolderItems.filter((item: any) => item.isFolder);
      const files = currentFolderItems.filter((item: any) => !item.isFolder);

      const ancestors = (await foldersService.listAllAncestors({ folderId: currentFolder.id })).entries;

      addFolderGroup({ folderItems: folders, folder: currentFolder, ancestors });
      addFileGroup({ fileItems: files, parentId: currentFolder.id });
    })();
  }, [currentFolderId]);

  return (
    <Container>
      <Header isSubHeader={true}>
        <>
          <FolderPathNav currentFolder={selectedCurrentFolder} />
        </>
        <>
          <div style={{ marginRight: '1rem' }}>
            {storageItemViewMode === 'grid' ? (
              <ViewListIcon onClick={toggleStorageItemViewMode} sx={{ color: 'common.grey' }} />
            ) : (
              <GridViewIcon onClick={toggleStorageItemViewMode} sx={{ color: 'common.grey' }} />
            )}
          </div>
          <div>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleOpenMenu}
              sx={{
                maxWidth: '110px',
                maxHeight: '50px',
                minWidth: '110px',
                minHeight: '50px',
                backgroundColor: 'background.secondary',
              }}
            >
              New
            </Button>

            <PopupMenu menuItems={menuItems} anchorEl={anchorEl} handleClose={handleCloseMenu} open={openMenu} />
          </div>
        </>
      </Header>

      <NewFolderForm
        open={openNewFolderForm}
        currentFolderId={selectedCurrentFolder?.id}
        handleClose={handleCloseNewFolderForm}
      />
      <Uploader
        onChange={(e) => {
          if (!e.currentTarget.value) return;

          filesService
            .upload({
              parentId: selectedCurrentFolder?.id,
              fileToUpload: e.target.files![0], // eslint-disable-line @typescript-eslint/no-non-null-assertion
              initUpload: (uploadItemId, fileName, progress) => {
                addUploadItem({
                  uploadItem: {
                    id: uploadItemId,
                    fileName,
                    progress,
                    isCompleted: false,
                  },
                });
              },
              onUpload: (uploadItemId, progress, uploadedSize) => {
                updateUploadItem({
                  uploadItem: { id: uploadItemId, progress, uploadedSize: formatBytes(uploadedSize) },
                });
              },
              afterUpload: (uploadItemId, progress) => {
                updateUploadItem({
                  uploadItem: {
                    id: uploadItemId,
                    progress,
                    isCompleted: true,
                  },
                });
              },
            })
            .then((result) => {
              addOneFileItem({ fileItem: result, parentId: selectedCurrentFolder?.id });
              e.target.value = '';
            })
            .catch((err) => console.log(err));
        }}
        ref={fileUploaderRef}
      />

      <StorageItemsContainer>
        <StorageItemListContainer arrangeType={storageItemViewMode}>
          <>
            {folderGroupList
              ?.find((group) => group.parentId === selectedCurrentFolder?.id)
              ?.folderItems?.map((folder: any) => (
                <StorageItemContextMenu
                  storageItem={folder}
                  currentFolderId={selectedCurrentFolder?.id}
                  key={folder.id}
                >
                  <FolderItem folder={folder} arrangeType={storageItemViewMode} />
                </StorageItemContextMenu>
              ))}
          </>
          <>
            {fileGroupList
              ?.find((group) => group.parentId === selectedCurrentFolder?.id)
              ?.fileItems?.map((file) => (
                <StorageItemContextMenu storageItem={file} currentFolderId={selectedCurrentFolder?.id} key={file.id}>
                  <FileItem file={file} arrangeType={storageItemViewMode} />
                </StorageItemContextMenu>
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
