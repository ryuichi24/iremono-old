import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '..';
import { selectedActions } from './selected-slice';

type SelectedItem = RootState['selectedState']['selectedItem'];
type SelectedViewerItem = RootState['selectedState']['selectedViewerItem'];
type SelectedCurrentFolder = RootState['selectedState']['selectedCurrentFolder'];

interface SelectedActions {
  setSelectedItem: (args: { selectedItem: SelectedItem }) => void;
  setSelectedViewerItem: (args: { selectedViewerItem: SelectedViewerItem }) => void;
  setSelectedCurrentFolder: (args: { selectedCurrentFolder: SelectedCurrentFolder }) => void;
}

export const useSelectedActions = (): SelectedActions => {
  const dispatch: AppDispatch = useDispatch();

  const setSelectedItem = useCallback((args: { selectedItem: SelectedItem }) => {
    dispatch(selectedActions.setSelectedItem(args));
  }, []);

  const setSelectedViewerItem = useCallback((args: { selectedViewerItem: SelectedViewerItem }) => {
    dispatch(selectedActions.setSelectedViewerItem(args));
  }, []);

  const setSelectedCurrentFolder = useCallback((args: { selectedCurrentFolder: SelectedCurrentFolder }) => {
    dispatch(selectedActions.setSelectedCurrentFolder(args));
  }, []);

  return {
    setSelectedItem,
    setSelectedViewerItem,
    setSelectedCurrentFolder,
  } as const;
};
