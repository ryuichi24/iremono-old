import React, { useEffect } from 'react';
import styled from 'styled-components';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button, Typography } from '@mui/material';
import { useModal } from '@/hooks/use-modal';
import { EnterEncryptionKeyForm } from './EnterEncryptionKeyForm';
import { useAppSelector } from '@/store/redux-hooks';
import { hasCryptoFolderSelector } from '@/store/auth/auth-slice';
import { foldersService } from '@/services/folders-service';
import { useAuthActions } from '@/store/auth/use-auth-actions';
import { CreateCryptoFolderForm } from './CreateCryptoFolderForm';

export const LockedCryptoFolders = () => {
  const hasCryptoFolder = useAppSelector(hasCryptoFolderSelector);
  const { setHasCryptoFolder } = useAuthActions();
  const [openForm, handleOpenForm, handleCloseForm] = useModal();

  useEffect(() => {
    foldersService
      .get({ folderId: '0', folderType: 'crypto' })
      .then((result) => {
        console.log(result);
        setHasCryptoFolder({ hasCryptoFolder: true });
      })
      .catch((err) => {
        console.log(err);
        setHasCryptoFolder({ hasCryptoFolder: false });
      });
  }, []);

  return (
    <>
      <Container>
        {hasCryptoFolder ? (
          <>
            <LockOutlinedIcon sx={{ fontSize: '150px', color: 'common.grey' }} />
            <Typography sx={{ color: 'text.secondary' }}>
              Crypto folder is locked. Please enter your encryption key to unlock the folder and decrypt your files.
            </Typography>
            <Button onClick={() => handleOpenForm()} variant="contained">
              Enter key
            </Button>
            <EnterEncryptionKeyForm open={openForm} handleClose={handleCloseForm} />
          </>
        ) : (
          <>
            <LockOutlinedIcon sx={{ fontSize: '150px', color: 'common.grey' }} />
            <Typography sx={{ color: 'text.secondary' }}>
              {`You have not yet created Crypto Folder. Please create it by entering encryption key.`}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {`*Note that iremono does not store your encryption key in server,`}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {`meaning that if you lose your key, there is no way of decrypting your files.`}
            </Typography>
            <Button onClick={() => handleOpenForm()} variant="contained">
              Create Crypto Folder
            </Button>
            <CreateCryptoFolderForm open={openForm} handleClose={handleCloseForm} />
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.palette.background.primary};
  height: 100%;
  overflow: scroll;
  gap: 1rem;
  padding: 1rem;
`;
