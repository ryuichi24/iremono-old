import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '..';
import { uiActions } from './ui-slice';

interface UIActions {
  toggleStorageItemViewMode: () => void;
}

export const useUIActions = (): UIActions => {
  const dispatch: AppDispatch = useDispatch();

  const toggleStorageItemViewMode = useCallback(() => {
    dispatch(uiActions.toggleStorageItemViewMode());
  }, [dispatch]);

  return { toggleStorageItemViewMode } as const;
};
