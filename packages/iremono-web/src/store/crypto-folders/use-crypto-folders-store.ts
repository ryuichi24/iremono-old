import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '..';
import { cryptoFoldersActions } from './crypto-folders-slice';

interface CryptoFoldersStore {
  folderGroupList: RootState['cryptoFoldersState']['folderGroupList'];
  addFolderGroup: (args: { folderItems: any[]; folder: any; ancestors: any[] }) => void;
  addOneFolderItem: (args: { folderItem: any; parentId: string }) => void;
  updateFolderItem: (args: { folderItem: any; parentId: string }) => void;
  removeFolderItem: (args: { folderItem: any; parentId: string }) => void;
}

export const useCryptoFoldersStore = (): CryptoFoldersStore => {
  const dispatch: AppDispatch = useDispatch();
  const folderGroupList = useSelector((state: RootState) => state.foldersState.folderGroupList);

  const addFolderGroup = useCallback(
    (args: { folderItems: any[]; folder: any; ancestors: any[] }) => {
      dispatch(cryptoFoldersActions.addFolderGroup(args));
    },
    [dispatch],
  );

  const addOneFolderItem = useCallback(
    (args: { folderItem: any; parentId: string }) => {
      dispatch(cryptoFoldersActions.addOneFolderItem(args));
    },
    [dispatch],
  );

  const updateFolderItem = useCallback(
    (args: { folderItem: any; parentId: string }) => {
      dispatch(cryptoFoldersActions.updateFolderItem(args));
    },
    [dispatch],
  );

  const removeFolderItem = useCallback(
    (args: { folderItem: any; parentId: string }) => {
      dispatch(cryptoFoldersActions.removeFolderItem(args));
    },
    [dispatch],
  );

  return {
    folderGroupList,
    addFolderGroup,
    addOneFolderItem,
    updateFolderItem,
    removeFolderItem,
  } as const;
};
