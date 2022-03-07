import React from 'react';
import styled from 'styled-components';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { Button, Typography } from '@mui/material';
import { useModal } from '@/hooks/use-modal';
import { EnterEncryptionKeyForm } from './EnterEncryptionKeyForm';

export const LockedCryptoFolders = () => {
  const [openEnterEncryptionKeyForm, handleOpenEnterEncryptionKeyForm, handleCloseEnterEncryptionKeyForm] = useModal();

  return (
    <>
      <Container>
        <LockOutlinedIcon sx={{ fontSize: '150px', color: 'common.grey' }} />
        <Typography sx={{ color: 'text.secondary' }}>
          Crypto folder is locked. Please enter your encryption key to unlock the folder and decrypt your files.
        </Typography>
        <Button onClick={() => handleOpenEnterEncryptionKeyForm()} variant="contained">
          Enter key
        </Button>
      </Container>
      <EnterEncryptionKeyForm open={openEnterEncryptionKeyForm} handleClose={handleCloseEnterEncryptionKeyForm} />
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
`;
