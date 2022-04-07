import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { LinearProgress, ThemeProvider } from '@mui/material';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Home, SignInPage, SignUpPage } from '@/pages';
import { useAuth } from '@/store/auth/use-auth';
import { useDarkMode } from '@/hooks/use-dark-mode';
import { UIContextProvider } from '@/contexts/ui-context';

export const App = () => {
  const [isAuthenticated, isLoading, error] = useAuth();
  const [currentTheme] = useDarkMode();

  if (isLoading) return <LinearProgress />;

  return (
    <ThemeProvider theme={currentTheme}>
      <UIContextProvider>
        <AppContainer>
          <Routes>
            <Route element={<ProtectedRoute isAllowed={isAuthenticated} redirectPath="/signin" />}>
              <Route path="/*" element={<Home />} />
            </Route>
            <Route element={<ProtectedRoute isAllowed={!isAuthenticated} redirectPath="/" />}>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppContainer>
      </UIContextProvider>
    </ThemeProvider>
  );
};

const AppContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.primary,
  height: '100vh',
  width: '100vw',
}));
