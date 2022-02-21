import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
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
import { foldersService } from '@/services/folders-service';
import { useFoldersStore } from '@/store/folders/use-folders-store';
import { useFilesStore } from '@/store/files/use-files-store';

export const Folders = () => {
  const params = useParams<{ id: string }>();
  const folderId = params.id || '0';

  const user = useSelector((state: RootState) => state.authState.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
