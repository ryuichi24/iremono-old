import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FolderExplore } from './FolderExplore';
import { CryptoFolderExplore } from './CryptoFolderExplore';
import { TrashExplore } from './TrashExplore';

export const Explore = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/folders" element={<FolderExplore />} />
        <Route path="/folders/:id" element={<FolderExplore />} />
        <Route path="/crypto-folders" element={<CryptoFolderExplore />} />
        <Route path="/crypto-folders/:id" element={<CryptoFolderExplore />} />
        <Route path="/books" element={<div></div>} />
        <Route path="/videos" element={<div></div>} />
        <Route path="/trash" element={<TrashExplore />} />
      </Routes>
    </>
  );
};
