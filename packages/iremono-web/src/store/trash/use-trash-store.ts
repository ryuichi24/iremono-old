import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { trashActions } from './trash-slice';

interface TrashStore {
  folderTrashItemList: RootState['trashState']['folderTrashItemList'];
  fileTrashItemList: RootState['trashState']['fileTrashItemList'];
  setTrashItems: (arg: { trashItems: any[] }) => void;
  removeTrashItem: (arg: { trashItem: any }) => void;
}

export const useTrashStore = (): TrashStore => {
  const dispatch: AppDispatch = useDispatch();
  const folderTrashItemList = useSelector((state: RootState) => state.trashState.folderTrashItemList);
  const fileTrashItemList = useSelector((state: RootState) => state.trashState.fileTrashItemList);

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
    folderTrashItemList,
    fileTrashItemList,
    setTrashItems,
    removeTrashItem,
  } as const;
};
