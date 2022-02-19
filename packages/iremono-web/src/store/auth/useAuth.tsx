import { authService } from '@/services/auth-service';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { setAuth, clearAuth } from '@/store/auth/auth-slice';

export const useAuth = () => {
  const [loading, toggleLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.authState.isAuthenticated);
  const user = useSelector((state: RootState) => state.authState.user);

  useEffect(() => {
    authService
      .checkAuth()
      .then((result) => {
        dispatch(setAuth(result));
        toggleLoading(false);
      })
      .catch((err) => {
        dispatch(clearAuth());
        toggleLoading(false);
        setError(err.message);
      });
  }, []);

  return [isAuthenticated, user, loading, error] as const;
};
