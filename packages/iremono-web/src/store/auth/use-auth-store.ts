import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { authActions } from './auth-slice';

interface AuthStore {
  user: any;
  isAuthenticated: boolean;
  setAuth: (args: { userId: string; email: string }) => void;
  clearAuth: () => void;
}

export const useAuthStore = (): AuthStore => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authState.user);
  const isAuthenticated = useSelector((state: RootState) => state.authState.isAuthenticated);

  const setAuth = useCallback((args: { userId: string; email: string }) => {
    dispatch(authActions.setAuth(args));
  }, []);

  const clearAuth = useCallback(() => {
    dispatch(authActions.clearAuth());
  }, [dispatch]);

  return { user, isAuthenticated, setAuth, clearAuth } as const;
};
