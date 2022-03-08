import React, { useState } from 'react';
// mui components
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
// action hooks
import { useFoldersActions } from '@/store/folders/use-folders-actions';
// services
import { foldersService } from '@/services/folders-service';

interface Props {
  currentFolderId: string;
  open: boolean;
  handleClose: () => void;
}

export const NewFolderForm = ({ currentFolderId, open, handleClose }: Props) => {
  const [folderName, setFolderName] = useState('Untitled folder');

  const { addOneFolderItem } = useFoldersActions();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleClose();
    foldersService
      .create({ parentId: currentFolderId, name: folderName })
      .then((result) => {
        addOneFolderItem({ folderItem: result, parentId: currentFolderId });
        setFolderName('Untitled folder');
      })
      .catch((err) => console.log(err));
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ backgroundColor: 'background.secondary' }}>New Folder</DialogTitle>
      <DialogContent sx={{ width: '300px', backgroundColor: 'background.secondary' }}>
        <TextField
          autoFocus
          margin="dense"
          label="folder name"
          type="text"
          fullWidth
          variant="standard"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ backgroundColor: 'background.secondary' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};
