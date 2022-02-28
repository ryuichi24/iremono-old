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
      <ThumbnailAltText fontSize={extensionTextSize}>
        <Typography fontWeight="fontWeightBold">{fileExtension.toUpperCase()}</Typography>
      </ThumbnailAltText>
    </Container>
  );
};

const Container = styled.div<{ bgColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.shape.borderRadius};
  background-color: ${({ bgColor }) => bgColor};
  width: 100px;
  height: 100px;
`;

const ThumbnailAltText = styled.div<{ fontSize: string }>`
  color: white;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 600;
`;
