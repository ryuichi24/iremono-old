import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { authActions } from './auth-slice';

interface AuthStore {
  user: RootState['authState']['user'];
  clientEncryptionKey: RootState['authState']['clientEncryptionKey'];
  isAuthenticated: RootState['authState']['isAuthenticated'];
  setAuth: (args: { userId: string; email: string }) => void;
  clearAuth: () => void;
  setClientEncryptionKey: (args: { clientEncryptionKey: RootState['authState']['clientEncryptionKey'] }) => void;
}

export const useAuthStore = (): AuthStore => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authState.user);
  const isAuthenticated = useSelector((state: RootState) => state.authState.isAuthenticated);
  const clientEncryptionKey = useSelector((state: RootState) => state.authState.clientEncryptionKey);

  const setAuth = useCallback((args: { userId: string; email: string }) => {
    dispatch(authActions.setAuth(args));
  }, []);

  const setClientEncryptionKey = useCallback(
    (args: { clientEncryptionKey: RootState['authState']['clientEncryptionKey'] }) => {
      dispatch(authActions.setClientEncryptionKey(args));
    },
    [],
  );

  const clearAuth = useCallback(() => {
    dispatch(authActions.clearAuth());
  }, [dispatch]);

  return { user, isAuthenticated, setAuth, clearAuth, clientEncryptionKey, setClientEncryptionKey } as const;
};
