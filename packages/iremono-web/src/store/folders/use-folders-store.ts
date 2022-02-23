import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { foldersActions } from './folders-slice';

interface foldersStore {
  folderGroupList: RootState['foldersState']['folderGroupList'];
  addFolderGroup: (args: { folderItems: any[]; parentId: string }) => void;
  addOneFolderItem: (args: { folderItem: any }) => void;
  updateFolderItem: (args: { folderItem: any }) => void;
  removeFolderItem: (args: { folderItem: any }) => void;
}

export const useFoldersStore = (): foldersStore => {
  const dispatch: AppDispatch = useDispatch();
  const folderGroupList = useSelector((state: RootState) => state.foldersState.folderGroupList);

  const addFolderGroup = useCallback(
    (args: { folderItems: any[]; parentId: string }) => {
      dispatch(foldersActions.addFolderGroup(args));
    },
    [dispatch],
  );

  const addOneFolderItem = useCallback(
    (args: { folderItem: any }) => {
      dispatch(foldersActions.addOneFolderItem(args));
    },
    [dispatch],
  );

  const updateFolderItem = useCallback(
    (args: { folderItem: any }) => {
      dispatch(foldersActions.updateFolderItem(args));
    },
    [dispatch],
  );

  const removeFolderItem = useCallback(
    (args: { folderItem: any }) => {
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
