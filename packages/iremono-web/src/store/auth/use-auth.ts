import { authService } from '@/services/auth-service';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../redux-hooks';
import { isAuthenticatedSelector } from './auth-slice';
import { useAuthActions } from './use-auth-actions';

export const useAuth = () => {
  const [loading, toggleLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setAuth, clearAuth } = useAuthActions();
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);

  useEffect(() => {
    authService
      .checkAuth()
      .then((result) => {
        setAuth(result);
        toggleLoading(false);
      })
      .catch((err) => {
        clearAuth();
        toggleLoading(false);
        setError(err.message);
      });
  }, []);

  return [isAuthenticated, loading, error] as const;
};
