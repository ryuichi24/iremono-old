import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { uiActions } from './ui-slice';

interface UIStore {
  storageItemViewMode: RootState['uiState']['storageItemViewMode'];
  toggleStorageItemViewMode: () => void;
}

export const useUIStore = (): UIStore => {
  const dispatch: AppDispatch = useDispatch();
  const storageItemViewMode = useSelector((state: RootState) => state.uiState.storageItemViewMode);

  const toggleStorageItemViewMode = useCallback(() => {
    dispatch(uiActions.toggleStorageItemViewMode());
  }, [dispatch]);

  return { storageItemViewMode, toggleStorageItemViewMode } as const;
};
