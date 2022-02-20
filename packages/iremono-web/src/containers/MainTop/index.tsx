import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Books } from './Books';
import { Folders } from './Folders';
import { Trash } from './Trash';
import { Videos } from './Videos';

interface Props {
  user: any;
}

export const MainTop = ({ user }: Props) => {
  return (
    <>
      <Routes>
        <Route path="/folders" element={<Folders />} />
        <Route path="/books" element={<Books />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </>
  );
};
