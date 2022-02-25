import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { selectedActions } from './selected-slice';

type SelectedItem = RootState['selectedState']['selectedItem'];
type SelectedViewerItem = RootState['selectedState']['selectedViewerItem'];

interface SelectedStore {
  selectedItem: SelectedItem;
  selectedViewerItem: SelectedViewerItem;
  setSelectedItem: (args: { selectedItem: SelectedItem }) => void;
  setSelectedViewerItem: (args: { selectedViewerItem: SelectedViewerItem }) => void;
}

export const useSelectedStore = (): SelectedStore => {
  const dispatch: AppDispatch = useDispatch();
  const selectedItem = useSelector((state: RootState) => state.selectedState.selectedItem);
  const selectedViewerItem = useSelector((state: RootState) => state.selectedState.selectedViewerItem);

  const setSelectedItem = useCallback((args: { selectedItem: SelectedItem }) => {
    dispatch(selectedActions.setSelectedItem(args));
  }, []);

  const setSelectedViewerItem = useCallback((args: { selectedViewerItem: SelectedViewerItem }) => {
    dispatch(selectedActions.setSelectedViewerItem(args));
  }, []);

  return {
    selectedItem,
    selectedViewerItem,
    setSelectedItem,
    setSelectedViewerItem,
  } as const;
};
