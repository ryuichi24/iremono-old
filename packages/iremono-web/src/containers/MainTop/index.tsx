import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Books } from './Books';
import { Folders } from './Folders';
import { Trash } from './Trash';
import { Videos } from './Videos';

export const MainTop = () => {
  return (
    <Container>
      <Routes>
        <Route path="/folders" element={<Folders />} />
        <Route path="/books" element={<Books />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </Container>
  );
};

const Container = styled('div')`
  height: 100%;
  width: 100%;
`;
