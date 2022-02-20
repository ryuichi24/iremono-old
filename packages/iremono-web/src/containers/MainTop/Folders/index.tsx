import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { RootState } from '@/store';
import { Header } from '@/components/Header';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CloseIcon from '@mui/icons-material/Close';

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
  return (
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
  );
};
