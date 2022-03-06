import React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import Typography from '@mui/material/Typography';
import { ListItemContainer } from './ListItemContainer';

interface Props {
  folder: any;
  handleDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const ListFolderItemCard = ({ folder, handleClick, handleDoubleClick }: Props) => {
  return (
    <>
      <ListItemContainer onClick={handleClick} onDoubleClick={handleDoubleClick}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <FolderIcon sx={{ color: 'text.secondary' }} />
          <Typography sx={{ color: 'text.secondary' }}>{folder.name}</Typography>
        </div>
        <div>
          <Typography sx={{ color: 'text.secondary' }}>
            {new Date(folder.updatedAt).toISOString().split('T')[0]}
          </Typography>
        </div>
        <div>
          <Typography sx={{ color: 'text.secondary' }}>{folder.fileSize || '-'}</Typography>
        </div>
      </ListItemContainer>
    </>
  );
};
