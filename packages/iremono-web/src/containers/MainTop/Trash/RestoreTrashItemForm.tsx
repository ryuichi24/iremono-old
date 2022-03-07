import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { filesService } from '@/services/files-service';
import { Typography } from '@mui/material';
import { useTrashActions } from '@/store/trash/use-trash-actions';
import { foldersService } from '@/services/folders-service';
import { useFoldersActions } from '@/store/folders/use-folders-actions';
import { useFilesActions } from '@/store/files/use-files-actions';

interface Props {
  trashItem: any;
  open: boolean;
  handleClose: () => void;
}

export const RestoreTrashItemForm = ({ trashItem, open, handleClose }: Props) => {
  const { removeTrashItem } = useTrashActions();
  const { addOneFolderItem } = useFoldersActions();
  const { addOneFileItem } = useFilesActions();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleClose();

    trashItem.isFolder
      ? foldersService
          .restore({ folderId: trashItem.id })
          .then((result) => {
            removeTrashItem({ trashItem: trashItem });
            addOneFolderItem({ folderItem: trashItem, parentId: trashItem.parentId });
          })
          .catch((err) => console.log(err))
      : filesService
          .restore({ fileId: trashItem.id })
          .then((result) => {
            removeTrashItem({ trashItem: trashItem });
            addOneFileItem({ fileItem: trashItem, parentId: trashItem.parentId });
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
