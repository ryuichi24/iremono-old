import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
interface Props {
  file: any;
}

export const VideoViewer = ({ file }: Props): JSX.Element => {
  const [videoURL, setVideoURL] = useState('');
  useEffect(() => {
    setVideoURL(`/api/files/${file.id}/video`);
  }, [file]);
  return (
    <Container>
      <VideoPlayer autoPlay src={videoURL} controls></VideoPlayer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color);
  height: 100%;
  overflow: scroll;
`;

const VideoPlayer = styled.video`
  display: block;
  object-fit: contain;
  width: auto;
  height: 600px;
`;
