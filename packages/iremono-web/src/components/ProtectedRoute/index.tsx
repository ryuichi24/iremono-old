import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  isAllowed: boolean;
  redirectPath?: string;
  children?: React.ReactNode;
}

export const ProtectedRoute = ({ isAllowed, redirectPath = '/signin', children }: Props): JSX.Element => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};
