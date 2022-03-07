import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '..';
import { trashActions } from './trash-slice';

interface TrashActions {
  setTrashItems: (arg: { trashItems: any[] }) => void;
  removeTrashItem: (arg: { trashItem: any }) => void;
}

export const useTrashActions = (): TrashActions => {
  const dispatch: AppDispatch = useDispatch();

  const setTrashItems = useCallback(
    (args: { trashItems: any[] }) => {
      dispatch(trashActions.setTrashItems(args));
    },
    [dispatch],
  );

  const removeTrashItem = useCallback(
    (args: { trashItem: any }) => {
      dispatch(trashActions.removeTrashItem(args));
    },
    [dispatch],
  );

  return {
    setTrashItems,
    removeTrashItem,
  } as const;
};
