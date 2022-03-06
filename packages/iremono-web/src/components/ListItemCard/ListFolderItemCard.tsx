import React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import Typography from '@mui/material/Typography';
import { ListItemContainer } from './ListItemContainer';
import styled from 'styled-components';

interface Props {
  folder: any;
  handleDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const ListFolderItemCard = ({ folder, handleClick, handleDoubleClick }: Props) => {
  return (
    <>
      <ListItemContainer onClick={handleClick} onDoubleClick={handleDoubleClick}>
        <FolderNameSection>
          <FolderIcon sx={{ color: 'text.secondary', fontSize: '30px' }} />
          <Typography sx={{ color: 'text.secondary' }}>{folder.name}</Typography>
        </FolderNameSection>
        <div>
          <Typography sx={{ color: 'text.secondary' }}>
            {new Date(folder.updatedAt).toISOString().split('T')[0]}
          </Typography>
        </div>
        <div>
          <Typography sx={{ color: 'text.secondary' }}>{folder.fileSize || ''}</Typography>
        </div>
      </ListItemContainer>
    </>
  );
};

const FolderNameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
