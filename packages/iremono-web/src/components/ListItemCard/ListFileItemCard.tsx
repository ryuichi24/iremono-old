import React from 'react';
import Typography from '@mui/material/Typography';
import { formatBytes } from '@iremono/util/dist/format-bytes';
import { ListItemContainer } from './ListItemContainer';
import styled from 'styled-components';
import { ThumbnailAlt } from '../AltThumbnail';

interface Props {
  file: any;
  thumbnailURL?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
  handleDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const ListFileItemCard = ({ file, thumbnailURL, handleClick, handleDoubleClick }: Props) => {
  return (
    <ListItemContainer onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <FileNameSection>
        <ThumbnailContainer>
          {thumbnailURL ? (
            <Thumbnail src={thumbnailURL} />
          ) : (
            <ThumbnailAlt fileExtension={file.fileExtension} extensionTextSize={'10px'} />
          )}
        </ThumbnailContainer>
        <Typography sx={{ color: 'text.secondary' }}>{file.name}</Typography>
      </FileNameSection>
      <div>
        <Typography sx={{ color: 'text.secondary' }}>{new Date(file.updatedAt).toISOString().split('T')[0]}</Typography>
      </div>
      <div>
        <Typography sx={{ color: 'text.secondary' }}>{formatBytes(file.fileSize)}</Typography>
      </div>
    </ListItemContainer>
  );
};

const FileNameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;

const Thumbnail = styled.img`
  border-radius: ${(props) => props.theme.shape.borderRadius} ${(props) => props.theme.shape.borderRadius} 0px 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`;
