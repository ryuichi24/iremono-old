import { authService } from '@/services/auth-service';
import { useEffect, useState } from 'react';
import { useAuthStore } from './use-auth-store';

export const useAuth = () => {
  const [loading, toggleLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, setAuth, clearAuth } = useAuthStore();

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
