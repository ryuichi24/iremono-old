import React from 'react';
import Typography from '@mui/material/Typography';
import { formatBytes } from '@iremono/util/dist/format-bytes';
import { ListItemContainer } from './ListItemContainer';

interface Props {
  file: any;
  thumbnailURL?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
  handleDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const ListFileItemCard = ({ file, thumbnailURL, handleClick, handleDoubleClick }: Props) => {
  return (
    <ListItemContainer onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <div>
        <Typography sx={{ color: 'text.secondary' }}>{file.name}</Typography>
      </div>
      <div>
        <Typography sx={{ color: 'text.secondary' }}>{new Date(file.updatedAt).toISOString().split('T')[0]}</Typography>
      </div>
      <div>
        <Typography sx={{ color: 'text.secondary' }}>{formatBytes(file.fileSize)}</Typography>
      </div>
    </ListItemContainer>
  );
};
