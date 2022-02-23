import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { ThumbnailAlt } from '../AltThumbnail';

interface Props {
  file: any;
}

export const FileItem = ({ file }: Props) => {
  return (
    <Container>
      <ThumbnailSection>
        <ThumbnailAlt fileExtension={file.fileExtension} extensionTextSize={'40px'} />
      </ThumbnailSection>
      <FileNameSection>
        <Typography sx={{ color: 'text.primary' }}>{file.name}</Typography>
      </FileNameSection>
    </Container>
  );
};

const Container = styled('div')`
  border-radius: ${(props) => props.theme.shape.borderRadius};
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  width: 280px;
  height: 290px;
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.palette.action.hover};
  }
`;

const ThumbnailSection = styled('div')`
  width: 100%;
  height: 70%;
  border-radius: inherit;
  border-radius: ${(props) => props.theme.shape.borderRadius} ${(props) => props.theme.shape.borderRadius} 0px 0px;
  background-color: ${(props) => props.theme.palette.background.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileNameSection = styled('div')`
  height: 30%;
  border-radius: 0px 0px ${(props) => props.theme.shape.borderRadius} ${(props) => props.theme.shape.borderRadius};
`;
