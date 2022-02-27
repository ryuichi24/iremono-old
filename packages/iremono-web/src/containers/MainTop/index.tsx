import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { UploadProgress } from '@/components/UploadProgress';
import { useUploadsStore } from '@/store/uploads/use-uploads-store';
import { Books } from './Books';
import { CryptoFolders } from './CryptoFolders';
import { Folders } from './Folders';
import { Trash } from './Trash';
import { Videos } from './Videos';

export const MainTop = () => {
  const { uploadItemList, clearUploadItems, showProgress } = useUploadsStore();

  return (
    <>
      <Container>
        <Routes>
          <Route path="/folders" element={<Folders />} />
          <Route path="/folders/:id" element={<Folders />} />

          <Route path="/crypto-folders" element={<CryptoFolders />} />
          <Route path="/books" element={<Books />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/trash" element={<Trash />} />

          <Route path="*" element={<Navigate to="/folders" />} />
        </Routes>
      </Container>

      <UploadProgress isActive={showProgress} uploadItemList={uploadItemList} clearUploadItems={clearUploadItems} />
    </>
  );
};

const Container = styled('div')`
  height: 100%;
  width: 100%;
`;
