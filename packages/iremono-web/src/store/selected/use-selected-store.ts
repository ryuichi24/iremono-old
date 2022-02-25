import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { selectedActions } from './selected-slice';

type SelectedItem = RootState['selectedState']['selectedItem'];

interface SelectedStore {
  selectedItem: SelectedItem;
  setSelectedItem: (args: { selectedItem: SelectedItem }) => void;
}

export const useSelectedStore = (): SelectedStore => {
  const dispatch: AppDispatch = useDispatch();
  const selectedItem = useSelector((state: RootState) => state.selectedState.selectedItem);

  const setSelectedItem = useCallback((args: { selectedItem: SelectedItem }) => {
    dispatch(selectedActions.setSelectedItem(args));
  }, []);

  return {
    selectedItem,
    setSelectedItem,
  } as const;
};
