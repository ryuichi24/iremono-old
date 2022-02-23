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
  storageItem: any;
  open: boolean;
  handleClose: () => void;
}

export const RenameStorageItemForm = ({ storageItem, open, handleClose }: Props) => {
  const [storageItemName, setStorageItemName] = useState(storageItem.name);

  const { updateFolderItem } = useFoldersStore();
  const { updateFileItem } = useFilesStore();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleClose();

    storageItem.isFolder
      ? foldersService
          .update({ folderId: storageItem.id, folderProperties: { name: storageItemName } })
          .then((result) => {
            updateFolderItem({ folderItem: result });
          })
          .catch((err) => console.log(err))
      : filesService
          .update({ fileId: storageItem.id, fileProperties: { name: storageItemName } })
          .then((result) => {
            updateFileItem({ fileItem: result });
          })
          .catch((err) => console.log(err));
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ backgroundColor: 'background.secondary' }}>
        Rename {storageItem.isFolder ? 'Folder' : 'File'}
      </DialogTitle>
      <DialogContent sx={{ width: '300px', backgroundColor: 'background.secondary' }}>
        <TextField
          autoFocus
          margin="dense"
          label="folder name"
          type="text"
          fullWidth
          variant="standard"
          value={storageItemName}
          onChange={(e) => setStorageItemName(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ backgroundColor: 'background.secondary' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Rename</Button>
      </DialogActions>
    </Dialog>
  );
};
