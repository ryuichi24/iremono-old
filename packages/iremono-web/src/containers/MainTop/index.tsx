import React from 'react';
import { Route, Routes } from 'react-router-dom';

interface Props {
  user: any;
}

export const MainTop = ({ user }: Props) => {
  return (
    <>
      <div>main top</div>
      {user.email}
      <Routes>
        <Route path="/folders" element={<div>folders</div>} />
        <Route path="/books" element={<div>books</div>} />
        <Route path="/videos" element={<div>videos</div>} />
        <Route path="/trash" element={<div>trash</div>} />
      </Routes>
    </>
  );
};
