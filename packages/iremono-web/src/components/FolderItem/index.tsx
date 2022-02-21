import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  folder: any;
}

export const FolderItem = ({ folder }: Props) => {
  return (
    <Container>
      <FolderIcon />
      <Typography>{folder.name}</Typography>
    </Container>
  );
};

const Container = styled(Box)`
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 200px;
  width: 30%;
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.palette.grey[100]};
  }
`;
