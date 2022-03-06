import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { ThumbnailAlt } from '../AltThumbnail';

interface Props {
  file: any;
  thumbnailURL?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
  handleDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const GridFileItemCard = ({ file, thumbnailURL, handleClick, handleDoubleClick }: Props) => {
  return (
    <>
      <GridItemContainer onClick={handleClick} onDoubleClick={handleDoubleClick}>
        <ThumbnailSection>
          {thumbnailURL ? (
            <Thumbnail src={thumbnailURL} />
          ) : (
            <ThumbnailAlt fileExtension={file.fileExtension} extensionTextSize={'65px'} />
          )}
        </ThumbnailSection>
        <FileNameSection>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {file.name}
          </Typography>
        </FileNameSection>
      </GridItemContainer>
    </>
  );
};

const GridItemContainer = styled('div')`
  border-radius: ${(props) => props.theme.shape.borderRadius};
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 290px;
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  cursor: pointer;
  background-color: ${(props) => props.theme.palette.background.primary};
  &:hover {
    background-color: ${(props) => props.theme.palette.action.hover};
  }
`;

const ThumbnailSection = styled('div')`
  width: 100%;
  height: 80%;
  border-radius: inherit;
  border-radius: ${(props) => props.theme.shape.borderRadius} ${(props) => props.theme.shape.borderRadius} 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Thumbnail = styled.img`
  border-radius: ${(props) => props.theme.shape.borderRadius} ${(props) => props.theme.shape.borderRadius} 0px 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`;

const FileNameSection = styled('div')`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  height: 20%;
  border-radius: 0px 0px ${(props) => props.theme.shape.borderRadius} ${(props) => props.theme.shape.borderRadius};
  border-top: 1px solid ${(props) => props.theme.palette.divider};
`;
