import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useFoldersStore } from '@/store/folders/use-folders-store';
import { filesService } from '@/services/files-service';
import { useFilesStore } from '@/store/files/use-files-store';
import { Typography } from '@mui/material';
import { useTrashStore } from '@/store/trash/use-trash-store';

interface Props {
  trashItem: any;
  open: boolean;
  handleClose: () => void;
}

export const RestoreTrashItemForm = ({ trashItem, open, handleClose }: Props) => {
  const { removeTrashItem } = useTrashStore();
  const { addOneFolderItem } = useFoldersStore();
  const { addOneFileItem } = useFilesStore();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleClose();

    filesService
      .restore({ fileId: trashItem.id })
      .then((result) => {
        removeTrashItem({ trashItem: trashItem });
        trashItem.isFolder ? addOneFolderItem({ folderItem: trashItem }) : addOneFileItem({ fileItem: trashItem });
      })
      .catch((err) => console.log(err));
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ backgroundColor: 'background.secondary' }}>
        Restore {trashItem.isFolder ? 'Folder' : 'File'}
      </DialogTitle>
      <DialogContent sx={{ width: '300px', backgroundColor: 'background.secondary' }}>
        <Typography sx={{ color: 'text.primary' }}>{'Are you sure you want to restore this item?'}</Typography>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: 'background.secondary' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Restore</Button>
      </DialogActions>
    </Dialog>
  );
};
