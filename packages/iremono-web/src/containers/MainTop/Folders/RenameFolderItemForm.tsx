import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { foldersService } from '@/services/folders-service';
import { useFoldersStore } from '@/store/folders/use-folders-store';
import { filesService } from '@/services/files-service';
import { useFilesStore } from '@/store/files/use-files-store';

interface Props {
  folderItem: any;
  open: boolean;
  handleClose: () => void;
}

export const RenameFolderItemForm = ({ folderItem, open, handleClose }: Props) => {
  const [folderItemName, setFolderItemName] = useState(folderItem.name);

  const { updateFolderItem } = useFoldersStore();
  const { updateFileItem } = useFilesStore();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleClose();

    folderItem.isFolder
      ? foldersService
          .update({ folderId: folderItem.id, folderProperties: { name: folderItemName } })
          .then((result) => {
            updateFolderItem({ parentId: folderItem.parentId, folderItem: result });
          })
          .catch((err) => console.log(err))
      : filesService
          .update({ fileId: folderItem.id, fileProperties: { name: folderItemName } })
          .then((result) => {
            updateFileItem({ parentId: folderItem.parentId, fileItem: result });
          })
          .catch((err) => console.log(err));
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Rename {folderItem.isFolder ? 'Folder' : 'File'}</DialogTitle>
      <DialogContent sx={{ width: '300px' }}>
        <TextField
          autoFocus
          margin="dense"
          label="folder name"
          type="text"
          fullWidth
          variant="standard"
          value={folderItemName}
          onChange={(e) => setFolderItemName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Rename</Button>
      </DialogActions>
    </Dialog>
  );
};
