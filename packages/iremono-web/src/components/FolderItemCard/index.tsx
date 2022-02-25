import React from 'react';
import styled from 'styled-components';
import FolderIcon from '@mui/icons-material/Folder';
import Typography from '@mui/material/Typography';

interface Props {
  folder: any;
  handleDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const FolderItemCard = ({ folder, handleClick, handleDoubleClick }: Props) => {
  return (
    <Container onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <FolderIcon sx={{ color: 'text.secondary' }} />
      <Typography sx={{ color: 'text.secondary' }}>{folder.name}</Typography>
    </Container>
  );
};

const Container = styled('div')`
  padding: 1rem;
  border-radius: ${(props) => props.theme.shape.borderRadius};
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 250px;
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  cursor: pointer;
  color: ${(props) => props.theme.palette.grey[900]};
  background-color: ${(props) => props.theme.palette.background.secondary};

  &:hover {
    background-color: ${(props) => props.theme.palette.action.hover};
  }
  text-decoration: none;
  &:visited {
    color: ${(props) => props.theme.palette.grey[900]};
  }
`;
