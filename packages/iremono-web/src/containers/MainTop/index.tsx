import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { UploadProgress } from '@/components/UploadProgress';
import { useUploadsActions } from '@/store/uploads/use-uploads-actions';
import { Books } from './Books';
import { CryptoFolders } from './CryptoFolders';
import { Folders } from './Folders';
import { Trash } from './Trash';
import { Videos } from './Videos';
import { useAppSelector } from '@/store/redux-hooks';
import { showProgressSelector, uploadItemListSelector } from '@/store/uploads/uploads-slice';

export const MainTop = () => {
  const { clearUploadItems } = useUploadsActions();
  const uploadItemList = useAppSelector(uploadItemListSelector);
  const showProgress = useAppSelector(showProgressSelector);

  return (
    <>
      <Container>
        <Routes>
          <Route path="/folders" element={<Folders />} />
          <Route path="/folders/:id" element={<Folders />} />

          <Route path="/crypto-folders" element={<CryptoFolders />}></Route>
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
