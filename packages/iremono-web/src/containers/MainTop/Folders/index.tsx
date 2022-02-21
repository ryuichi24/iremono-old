import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { RootState } from '@/store';
import { Header } from '@/components/Header';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { FolderItem } from '@/components/FolderItem';
import { FileItem } from '@/components/FileItem';

export const Folders = () => {
  const user = useSelector((state: RootState) => state.authState.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const folders = [
    { id: '1', name: 'folder 1' },
    { id: '2', name: 'folder 2' },
    { id: '3', name: 'folder 3' },
    { id: '4', name: 'folder 4' },
    { id: '5', name: 'folder 5' },
    { id: '6', name: 'folder 6' },
  ];

  const files = [
    { id: '1', name: 'file 1' },
    { id: '2', name: 'file 2' },
    { id: '3', name: 'file 3' },
    { id: '4', name: 'file 4' },
    { id: '5', name: 'file 5' },
    { id: '6', name: 'file 6' },
    { id: '7', name: 'file 7' },
    { id: '8', name: 'file 8' },
    { id: '9', name: 'file 9' },
    { id: '10', name: 'file 10' },
  ];
  return (
    <Box sx={{}}>
      <Header user={user}>
        <>
          <div>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClick}>
              New
            </Button>

            <Menu id="basic-menu" open={open} anchorEl={anchorEl} onClose={handleClose}>
              <MenuList sx={{ width: '180px' }}>
                <MenuItem>
                  <ListItemIcon>
                    <CreateNewFolderIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>New Folder</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <UploadFileIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Upload File</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <DriveFolderUploadIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Upload Folder</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <CloseIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Close</ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </>
        <></>
      </Header>

      <Box sx={{ paddingTop: '1rem' }}>
        <FolderSection>
          <SectionName>Folders</SectionName>
          <FolderList>
            {folders.map((folder) => (
              <FolderItem folder={folder} key={folder.id} />
            ))}
          </FolderList>
        </FolderSection>

        <FileSection>
          <SectionName>Files</SectionName>
          <FileList container>
            {files.map((file) => (
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
