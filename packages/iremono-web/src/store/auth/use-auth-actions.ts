import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '..';
import { authActions } from './auth-slice';

interface AuthActions {
  setAuth: (args: { userId: string; email: string }) => void;
  clearAuth: () => void;
  setClientEncryptionKey: (args: { clientEncryptionKey: RootState['authState']['clientEncryptionKey'] }) => void;
  setHasCryptoFolder: (args: { hasCryptoFolder: boolean }) => void;
}

export const useAuthActions = (): AuthActions => {
  const dispatch: AppDispatch = useDispatch();

  const setAuth = useCallback((args: { userId: string; email: string }) => {
    dispatch(authActions.setAuth(args));
  }, []);

  const setClientEncryptionKey = useCallback(
    (args: { clientEncryptionKey: RootState['authState']['clientEncryptionKey'] }) => {
      dispatch(authActions.setClientEncryptionKey(args));
    },
    [],
  );

  const setHasCryptoFolder = useCallback((args: { hasCryptoFolder: boolean }) => {
    dispatch(authActions.setHasCryptoFolder(args));
  }, []);

  const clearAuth = useCallback(() => {
    dispatch(authActions.clearAuth());
  }, [dispatch]);

  return { setAuth, clearAuth, setClientEncryptionKey, setHasCryptoFolder } as const;
};
