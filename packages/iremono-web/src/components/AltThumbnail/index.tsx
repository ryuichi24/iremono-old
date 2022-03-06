import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { stringToColor } from '@iremono/util/dist/string-to-color';

interface Props {
  fileExtension: string;
  extensionTextSize: string;
}

export const ThumbnailAlt = ({ fileExtension, extensionTextSize }: Props): JSX.Element => {
  return (
    <Container bgColor={stringToColor(fileExtension)}>
      <Typography sx={{ fontSize: extensionTextSize, color: 'white' }} fontWeight="fontWeightBold">
        {fileExtension.toUpperCase()}
      </Typography>
    </Container>
  );
};

const Container = styled.div<{ bgColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.shape.borderRadius};
  background-color: ${({ bgColor }) => bgColor};
  width: 100%;
  height: 100%;
`;
