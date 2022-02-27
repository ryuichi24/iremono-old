import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { UploadStatusItem } from './UploadStatusItem';

interface Props {
  isActive: boolean;
  uploadItemList: any[];
  clearUploadItems: () => void;
}

export const UploadProgress = ({ isActive, uploadItemList, clearUploadItems }: Props): React.ReactPortal | null =>
  isActive
    ? ReactDOM.createPortal(
        <>
          <Container>
            <CloseBtnContainer>
              <CloseIcon
                onClick={() => clearUploadItems()}
                sx={{ cursor: 'pointer', color: 'common.white', paddingLeft: '0.5rem', paddingTop: '0.5rem' }}
              />
            </CloseBtnContainer>
            <UploadStatusItemContainer>
              {uploadItemList
                .slice()
                .reverse()
                .map((uploadItem) => (
                  <UploadStatusItem
                    key={uploadItem.id}
                    fileName={uploadItem.fileName || ''}
                    progress={uploadItem.progress}
                    uploadedSize={uploadItem.uploadedSize || '0'}
                    isCompleted={uploadItem.isCompleted || false}
                  />
                ))}
            </UploadStatusItemContainer>
          </Container>
        </>,
        document.getElementById('uploadProgressPortal')!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
      )
    : null;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 2%;
  bottom: 2%;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0), 0 2px 1px -1px rgba(0, 0, 0, 0), 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  width: 350px;
  height: auto;
  background-color: ${(props) => props.theme.palette.background.primary};
`;

const CloseBtnContainer = styled.div`
  position: relative;
  width: 100%;
  height: 35px;
  background-color: white;
  border-radius: 4px 4px 0px 0px;
  background-color: ${(props) => props.theme.palette.primary.main};
`;

const UploadStatusItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 1rem;
  max-height: 300px;
  overflow: scroll;
`;
