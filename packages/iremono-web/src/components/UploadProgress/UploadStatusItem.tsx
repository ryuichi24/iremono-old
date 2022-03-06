import React, { useState } from 'react';
import styled from 'styled-components';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Typography } from '@mui/material';

interface Props {
  fileName: string;
  progress: number;
  uploadedSize: string;
  isCompleted: boolean;
}

export const UploadStatusItem = ({ fileName, progress, uploadedSize, isCompleted }: Props): JSX.Element => {
  return (
    <Container>
      <InsertDriveFileOutlinedIcon sx={{ color: 'text.secondary' }} />

      <UploadStatusDetail>
        <UploadStatusDetailTopSection>
          <Typography sx={{ color: 'text.secondary', fontSize: '16px' }}>{fileName}</Typography>
          {!isCompleted && <Typography sx={{ color: 'text.secondary' }}>{`${progress}%`}</Typography>}
        </UploadStatusDetailTopSection>
        <div>
          {isCompleted ? (
            <CompletedResultContainer>
              <Typography sx={{ color: 'text.secondary', fontSize: '14px' }}>{uploadedSize}</Typography>
            </CompletedResultContainer>
          ) : (
            <ProgressBar>
              <ProgressingBar width={`${progress}%`} />
            </ProgressBar>
          )}
        </div>
      </UploadStatusDetail>
      {isCompleted && (
        <IconContainer>
          <CheckCircleOutlineOutlinedIcon sx={{ color: 'secondary.main' }} />
        </IconContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  background-color: ${(props) => props.theme.palette.background.primary};
  border-radius: 4px;
  align-items: center;
  padding: 0.5rem;
`;

const UploadStatusDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  width: 100%;
`;

const UploadStatusDetailTopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 0.5rem;
`;

const ProgressBar = styled.div`
  background-color: ${(props) => props.theme.palette.background.primary};
  height: 0.5rem;
  width: 18rem;
  border-radius: 4px;
`;

const ProgressingBar = styled.div<{ width: string }>`
  background-color: ${(props) => props.theme.palette.secondary.main};
  height: 0.5rem;
  width: ${({ width }) => width};
  border-radius: 4px;
`;

const CompletedResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 1rem;
`;

const IconContainer = styled.div`
  padding-right: 1rem;
`;
