import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { foldersService } from '@/services/folders-service';
import { useFoldersStore } from '@/store/folders/use-folders-store';
interface Props {
  folderId: string;
  open: boolean;
  handleClose: () => void;
}

export const NewFolderForm = ({ folderId, open, handleClose }: Props) => {
  const [folderName, setFolderName] = useState('Untitled folder');

  const { addOneFolderItem } = useFoldersStore();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleClose();
    foldersService
      .create({ parentId: folderId, name: folderName })
      .then((result) => {
        addOneFolderItem({ folderItem: result });
      })
      .catch((err) => console.log(err));
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>New Folder</DialogTitle>
      <DialogContent sx={{ width: '300px' }}>
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
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};
