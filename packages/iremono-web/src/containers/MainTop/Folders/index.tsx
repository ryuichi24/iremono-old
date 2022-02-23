import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Button, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Header } from '@/components/Header';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { FolderItem } from '@/components/FolderItem';
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

export const Folders = () => {
  const params = useParams<{ id: string }>();
  const currentFolderId = params.id || '0';

  const [openNewFolderForm, handleOpenNewFolderForm, handleCloseNewFolderForm] = useModal();
  const fileUploaderRef: React.Ref<HTMLInputElement> = useRef(null);
  const [openMenu, anchorEl, handleOpenMenu, handleCloseMenu] = usePopupMenu();
  const { addFolderGroup, folderGroupList } = useFoldersStore();
  const { addFileGroup, addOneFileItem, fileGroupList } = useFilesStore();

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
    foldersService
      .listItems({ folderId: currentFolderId })
      .then((result) => {
        const folders = result.entries.filter((item: any) => item.isFolder);
        const files = result.entries.filter((item: any) => !item.isFolder);
        addFolderGroup({ folderItems: folders, parentId: currentFolderId });
        addFileGroup({ fileItems: files, parentId: currentFolderId });
      })
      .catch((err) => console.log(err));
  }, [currentFolderId]);

  return (
    <Box sx={{ height: '100%' }}>
      <Header isSubHeader={true}>
        <>
          <div>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenMenu}>
              New
            </Button>

            <PopupMenu menuItems={menuItems} anchorEl={anchorEl} handleClose={handleCloseMenu} open={openMenu} />
          </div>
        </>
        <></>
      </Header>

      <NewFolderForm open={openNewFolderForm} folderId={currentFolderId} handleClose={handleCloseNewFolderForm} />
      <Uploader
        onChange={(e) => {
          filesService
            .upload({ parentId: currentFolderId, fileToUpload: e.target.files![0] }) // eslint-disable-line @typescript-eslint/no-non-null-assertion
            .then((result) => {
              addOneFileItem({ fileItem: result });
              e.currentTarget.value = '';
            })
            .catch((err) => console.log(err));
        }}
        ref={fileUploaderRef}
      />

      <Box sx={{ overflow: 'scroll', height: '80%' }}>
        <FolderSection>
          <SectionName>Folders</SectionName>
          <FolderList>
            {folderGroupList
              ?.find((group) => group.parentId === currentFolderId)
              ?.folderItems?.map((folder: any) => (
                <StorageItemContextMenu storageItem={folder} key={folder.id}>
                  <FolderItem folder={folder} />
                </StorageItemContextMenu>
              ))}
          </FolderList>
        </FolderSection>
        <FileSection>
          <SectionName>Files</SectionName>
          <FileList container>
            {fileGroupList
              ?.find((group) => group.parentId === currentFolderId)
              ?.fileItems?.map((file) => (
                <StorageItemContextMenu storageItem={file} key={file.id}>
                  <FileItem file={file} />
                </StorageItemContextMenu>
              ))}
          </FileList>
        </FileSection>
      </Box>
    </Box>
  );
};

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
