import React from 'react';
import styled from 'styled-components';
import FolderIcon from '@mui/icons-material/Folder';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface Props {
  folder: any;
}

export const FolderItem = ({ folder }: Props) => {
  const navigate = useNavigate();

  return (
    <Container onDoubleClick={() => navigate(`/folders/${folder.id}`)}>
      <FolderIcon sx={{ color: 'text.primary' }} />
      <Typography sx={{ color: 'text.primary' }}>{folder.name}</Typography>
    </Container>
  );
};

const Container = styled('div')`
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 200px;
  width: 30%;
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  cursor: pointer;
  color: ${(props) => props.theme.palette.grey[900]};

  &:hover {
    background-color: ${(props) => props.theme.palette.action.hover};
  }
  text-decoration: none;
  &:visited {
    color: ${(props) => props.theme.palette.grey[900]};
  }
`;
