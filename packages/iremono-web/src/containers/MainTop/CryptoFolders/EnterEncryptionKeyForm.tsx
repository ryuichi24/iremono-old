import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useAuthActions } from '@/store/auth/use-auth-actions';
import { foldersService } from '@/services/folders-service';

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const EnterEncryptionKeyForm = ({ open, handleClose }: Props) => {
  const [encryptionKey, setEncryptionKey] = useState('');
  const { setClientEncryptionKey } = useAuthActions();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (encryptionKey.length < 10) {
      alert('the key length must be longer than 10.');
      setEncryptionKey('');
      return;
    }

    foldersService
      .verifyClientEncryptionKey({ encryptionKey })
      .then((result) => setClientEncryptionKey({ clientEncryptionKey: encryptionKey }))
      .catch((err) => {
        alert('cannot decrypt files with the provided key.');
        setEncryptionKey('');
      });
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ backgroundColor: 'background.secondary' }}>Enter encryption key</DialogTitle>
      <DialogContent sx={{ width: '300px', backgroundColor: 'background.secondary' }}>
        <TextField
          autoFocus
          margin="dense"
          label="encryption key"
          type="text"
          fullWidth
          variant="standard"
          value={encryptionKey}
          onChange={(e) => setEncryptionKey(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ backgroundColor: 'background.secondary' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};
