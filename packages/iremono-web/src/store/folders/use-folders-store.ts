import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { foldersActions } from './folders-slice';

interface foldersStore {
  folderGroupList: RootState['foldersState']['folderGroupList'];
  addFolderGroup: (args: { folderItems: any[]; folder: any; ancestors: any[] }) => void;
  addOneFolderItem: (args: { folderItem: any; parentId: string }) => void;
  updateFolderItem: (args: { folderItem: any; parentId: string }) => void;
  removeFolderItem: (args: { folderItem: any; parentId: string }) => void;
}

export const useFoldersStore = (): foldersStore => {
  const dispatch: AppDispatch = useDispatch();
  const folderGroupList = useSelector((state: RootState) => state.foldersState.folderGroupList);

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
    folderGroupList,
    addFolderGroup,
    addOneFolderItem,
    updateFolderItem,
    removeFolderItem,
  } as const;
};
