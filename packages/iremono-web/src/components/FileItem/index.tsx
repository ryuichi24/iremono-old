import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  file: any;
}

export const FileItem = ({ file }: Props) => {
  return (
    <Container>
      <Typography sx={{ color: 'text.primary' }}>{file.name}</Typography>
    </Container>
  );
};

const Container = styled(Box)`
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 200px;
  width: 30%;
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.palette.action.hover};
  }
`;
