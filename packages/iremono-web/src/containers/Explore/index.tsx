import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FolderExplore } from './FolderExplore';

export const Explore = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/folders" element={<FolderExplore />} />
        <Route path="/folders/:id" element={<FolderExplore />} />
        <Route path="/books" element={<div>book tree</div>} />
        <Route path="/videos" element={<div>video tree</div>} />
        <Route path="/trash" element={<div>trash items</div>} />
      </Routes>
    </>
  );
};
