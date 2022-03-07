import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '..';
import { foldersActions } from './folders-slice';

interface FoldersActions {
  addFolderGroup: (args: { folderItems: any[]; folder: any; ancestors: any[] }) => void;
  addOneFolderItem: (args: { folderItem: any; parentId: string }) => void;
  updateFolderItem: (args: { folderItem: any; parentId: string }) => void;
  removeFolderItem: (args: { folderItem: any; parentId: string }) => void;
}

export const useFoldersActions = (): FoldersActions => {
  const dispatch: AppDispatch = useDispatch();

  const addFolderGroup = useCallback(
    (args: { folderItems: any[]; folder: any; ancestors: any[] }) => {
      dispatch(foldersActions.addFolderGroup(args));
    },
    [dispatch],
  );

  const addOneFolderItem = useCallback(
    (args: { folderItem: any; parentId: string }) => {
      dispatch(foldersActions.addOneFolderItem(args));
    },
    [dispatch],
  );

  const updateFolderItem = useCallback(
    (args: { folderItem: any; parentId: string }) => {
      dispatch(foldersActions.updateFolderItem(args));
    },
    [dispatch],
  );

  const removeFolderItem = useCallback(
    (args: { folderItem: any; parentId: string }) => {
      dispatch(foldersActions.removeFolderItem(args));
    },
    [dispatch],
  );

  return {
    addFolderGroup,
    addOneFolderItem,
    updateFolderItem,
    removeFolderItem,
  } as const;
};
