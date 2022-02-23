import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FolderExplore } from './FolderExplore';

export const Explore = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/folders" element={<FolderExplore />} />
        <Route path="/folders/:id" element={<FolderExplore />} />
        <Route path="/crypto-folders" element={<div></div>} />
        <Route path="/books" element={<div></div>} />
        <Route path="/videos" element={<div></div>} />
        <Route path="/trash" element={<div></div>} />
      </Routes>
    </>
  );
};
