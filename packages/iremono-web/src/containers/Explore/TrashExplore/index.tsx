import React from 'react';
import { useAppSelector } from '@/store/redux-hooks';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import FolderIcon from '@mui/icons-material/Folder';
import { clientEncryptionKeySelector } from '@/store/auth/auth-slice';

export const TrashExplore = () => {
  const navigate = useNavigate();
  const encryptionKey = useAppSelector(clientEncryptionKeySelector);
  return (
    <Container>
      <Button
        onClick={() => navigate('/trash?type=normal')}
        variant="contained"
        startIcon={<FolderIcon />}
        sx={{ width: '250px' }}
      >
        Normal Trash
      </Button>

      <Button
        onClick={() => navigate(!encryptionKey ? '/crypto-folders' : '/trash?type=crypto')}
        variant="contained"
        startIcon={<LockIcon />}
        sx={{ width: '250px' }}
      >
        Crypto Trash
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding-top: 2rem;
  height: 100%;
  width: 100%;
`;
