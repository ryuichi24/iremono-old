import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useTrashActions } from '@/store/trash/use-trash-actions';
import { trashService } from '@/services/trash-service';

interface Props {
  trashItem: any;
  open: boolean;
  handleClose: () => void;
}

export const DeleteTrashItemForm = ({ trashItem, open, handleClose }: Props) => {
  const { removeTrashItem } = useTrashActions();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleClose();

    trashItem.isFolder
      ? trashService
          .deleteFolder({ folderId: trashItem.id })
          .then((result) => {
            removeTrashItem({ trashItem: trashItem });
          })
          .catch((err) => console.log(err))
      : trashService
          .deleteFile({ fileId: trashItem.id })
          .then((result) => {
            removeTrashItem({ trashItem: trashItem });
          })
          .catch((err) => console.log(err));
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ backgroundColor: 'background.secondary' }}>
        Delete {trashItem.isFolder ? 'Folder' : 'File'}
      </DialogTitle>
      <DialogContent sx={{ width: '300px', backgroundColor: 'background.secondary' }}>
        <Typography sx={{ color: 'text.primary' }}>{'Are you sure you want to delete this item?'}</Typography>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: 'background.secondary' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};
