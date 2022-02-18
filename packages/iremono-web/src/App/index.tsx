import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { SignUpPage } from '@/containers/SignUpPage';
import { SignInPage } from '@/containers/SignInPage';

export const App = () => {
  return (
    <BrowserRouter>
      <h1>iremono</h1>
      <Routes>
        <Route element={<ProtectedRoute isAllowed={true} redirectPath="/" />}>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
