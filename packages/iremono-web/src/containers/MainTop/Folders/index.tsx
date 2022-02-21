import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Header } from '@/components/Header';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import styled from 'styled-components';
import { FolderItem } from '@/components/FolderItem';
import { FileItem } from '@/components/FileItem';
import { foldersService } from '@/services/folders-service';
import { useFoldersStore } from '@/store/folders/use-folders-store';
import { useFilesStore } from '@/store/files/use-files-store';
import { PopupMenu } from '@/components/PopupMenu';
import { useAuthStore } from '@/store/auth/use-auth-store';
import { usePopupMenu } from '@/hooks/use-popup-menu';

export const Folders = () => {
  const params = useParams<{ id: string }>();
  const folderId = params.id || '0';

  const { user } = useAuthStore();

  const [open, anchorEl, handleNewBtnClick, handleMenuClose] = usePopupMenu();

  const menuItems = [
    {
      text: 'New Folder',
      icon: <CreateNewFolderIcon fontSize="small" />,
      action: () => console.log('new folder'),
    },
    {
      text: 'Upload File',
      icon: <UploadFileIcon fontSize="small" />,
      action: () => console.log('upload file'),
    },
    {
      text: 'Upload Folder',
      icon: <DriveFolderUploadIcon fontSize="small" />,
      action: () => console.log('upload folder'),
    },
  ];

  const { addFolderGroup, folderGroupList } = useFoldersStore();
  const { addFileGroup, fileGroupList } = useFilesStore();

  useEffect(() => {
    foldersService
      .listItems({ folderId })
      .then((result) => {
        const folders = result.entries.filter((item: any) => item.isFolder);
        const files = result.entries.filter((item: any) => !item.isFolder);
        addFolderGroup({ parentId: folderId, folderItems: folders });
        addFileGroup({ parentId: folderId, fileItems: files });
      })
      .catch((err) => console.log(err));
  }, [folderId]);

  return (
    <Box sx={{}}>
      <Header user={user}>
        <>
          <div>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleNewBtnClick}>
              New
            </Button>

            <PopupMenu menuItems={menuItems} anchorEl={anchorEl} handleClose={handleMenuClose} open={open} />
          </div>
        </>
        <></>
      </Header>

      <Box sx={{ paddingTop: '1rem' }}>
        <FolderSection>
          <SectionName>Folders</SectionName>
          <FolderList>
            {folderGroupList
              ?.find((group) => group.parentId === folderId)
              ?.folderItems?.map((folder: any) => (
                <FolderItem folder={folder} key={folder.id} />
              ))}
          </FolderList>
        </FolderSection>
        <FileSection>
          <SectionName>Files</SectionName>
          <FileList container>
            {fileGroupList
              ?.find((group) => group.parentId === folderId)
              ?.fileItems?.map((file) => (
                <FileItem file={file} key={file.id} />
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
  color: ${(props) => props.theme.palette.grey[800]};
`;
