import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from '@/components/Header';
import { RootState } from '@/store';

export const Books = () => {
  const user = useSelector((state: RootState) => state.authState.user);
  return (
    <Header user={user}>
      <></>
      <></>
    </Header>
  );
};
