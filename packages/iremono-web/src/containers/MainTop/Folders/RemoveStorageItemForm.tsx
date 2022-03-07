import React from 'react';
// mui components
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
// action hooks
import { useFoldersActions } from '@/store/folders/use-folders-actions';
import { useFilesActions } from '@/store/files/use-files-actions';
// services
import { foldersService } from '@/services/folders-service';
import { filesService } from '@/services/files-service';

interface Props {
  storageItem: any;
  currentFolderId: string;
  open: boolean;
  handleClose: () => void;
}

export const RemoveStorageItemForm = ({ storageItem, currentFolderId, open, handleClose }: Props) => {
  const { removeFolderItem } = useFoldersActions();
  const { removeFileItem } = useFilesActions();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleClose();

    storageItem.isFolder
      ? foldersService
          .remove({ folderId: storageItem.id })
          .then((result) => {
            removeFolderItem({ folderItem: storageItem, parentId: currentFolderId });
          })
          .catch((err) => console.log(err))
      : filesService
          .remove({ fileId: storageItem.id })
          .then((result) => {
            removeFileItem({ fileItem: storageItem, parentId: currentFolderId });
          })
          .catch((err) => console.log(err));
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ backgroundColor: 'background.secondary' }}>
        Remove {storageItem.isFolder ? 'Folder' : 'File'}
      </DialogTitle>
      <DialogContent sx={{ width: '300px', backgroundColor: 'background.secondary' }}>
        <Typography sx={{ color: 'text.primary' }}>{'Are you sure you want to delete this item?'}</Typography>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: 'background.secondary' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Remove</Button>
      </DialogActions>
    </Dialog>
  );
};
