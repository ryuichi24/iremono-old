import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { SignInPage, SignUpPage } from '@/pages';
import { useAuth } from '@/store/auth/useAuth';
import { LinearProgress } from '@mui/material';

export const App = () => {
  const [isAuthenticated, user, isLoading, error] = useAuth();

  if (isLoading) return <LinearProgress />;

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isAuthenticated} redirectPath="/signin" />}>
        <Route path="/" element={<div>welcome {user.email}</div>} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={!isAuthenticated} redirectPath="/" />}>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
