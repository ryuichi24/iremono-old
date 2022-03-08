import React, { useEffect, useState } from 'react';
import { filesService } from '@/services/files-service';
import styled from 'styled-components';
import { useAppSelector } from '@/store/redux-hooks';
import { clientEncryptionKeySelector } from '@/store/auth/auth-slice';

interface Props {
  file: any;
}

export const ImageViewer = ({ file }: Props) => {
  const [imageUrl, setImageUrl] = useState('');
  const encryptionKey = useAppSelector(clientEncryptionKeySelector);

  useEffect(() => {
    (async () => {
      const downloadFileToken = await filesService.getFileToken({
        fileId: file.id,
        tokenType: 'download',
        encryptionKey: file.isCryptoFolderItem && encryptionKey,
      });
      const result = await filesService.downloadImageFile({ fileId: file.id, downloadFileToken });
      setImageUrl(result);
    })();
  }, [file]);
  return (
    <Container>
      <Image src={imageUrl} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.palette.background.primary};
  height: 100%;
  overflow: scroll;
`;

const Image = styled.img`
  display: block;
  object-fit: contain;
  width: auto;
  height: 600px;
`;
