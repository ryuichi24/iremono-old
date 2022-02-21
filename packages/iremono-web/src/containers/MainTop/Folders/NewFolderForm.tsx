import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface Props {
  folderId: string;
  open: boolean;
  handleClose: () => void;
}

export const NewFolderForm = ({ folderId, open, handleClose }: Props) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>New Folder</DialogTitle>
      <DialogContent sx={{ width: '300px' }}>
        <TextField
          autoFocus
          margin="dense"
          placeholder="Untitled folder"
          label="folder name"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};
