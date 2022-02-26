import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { selectedActions } from './selected-slice';

type SelectedItem = RootState['selectedState']['selectedItem'];
type SelectedViewerItem = RootState['selectedState']['selectedViewerItem'];
type SelectedCurrentFolder = RootState['selectedState']['selectedCurrentFolder'];

interface SelectedStore {
  selectedItem: SelectedItem;
  selectedViewerItem: SelectedViewerItem;
  selectedCurrentFolder: SelectedCurrentFolder;
  setSelectedItem: (args: { selectedItem: SelectedItem }) => void;
  setSelectedViewerItem: (args: { selectedViewerItem: SelectedViewerItem }) => void;
  setSelectedCurrentFolder: (args: { selectedCurrentFolder: SelectedCurrentFolder }) => void;
}

export const useSelectedStore = (): SelectedStore => {
  const dispatch: AppDispatch = useDispatch();
  const selectedItem = useSelector((state: RootState) => state.selectedState.selectedItem);
  const selectedViewerItem = useSelector((state: RootState) => state.selectedState.selectedViewerItem);
  const selectedCurrentFolder = useSelector((state: RootState) => state.selectedState.selectedCurrentFolder);

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
    selectedItem,
    selectedViewerItem,
    selectedCurrentFolder,
    setSelectedItem,
    setSelectedViewerItem,
    setSelectedCurrentFolder,
  } as const;
};
