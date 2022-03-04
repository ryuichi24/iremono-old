import React from 'react';
import styled from 'styled-components';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { filesService } from '@/services/files-service';

interface Props {
  file: any;
}

export const DefaultViewer = ({ file }: Props) => {
  return (
    <Container>
      <InsertDriveFileIcon sx={{ fontSize: '150px', color: 'common.grey' }} />
      <Typography sx={{ color: 'text.secondary' }}>
        iremono does not support the file type for preview. Please download and open it on your device.
      </Typography>
      <Button
        onClick={async () => {
          const downloadFileToken = await filesService.getFileToken({
            fileId: file.id,
            tokenType: 'download',
          });
          filesService.download({ fileId: file.id, fileName: file.name, downloadFileToken });
        }}
        variant="contained"
      >
        Download
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.palette.background.primary};
  height: 100%;
  overflow: scroll;
  gap: 1rem;
`;
