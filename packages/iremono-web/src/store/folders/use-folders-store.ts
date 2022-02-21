import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { foldersActions } from './folders-slice';

interface foldersStore {
  folderGroupList: RootState['foldersState']['folderGroupList'];
  addFolderGroup: (args: { parentId: string; folderItems: any[] }) => void;
  addOneFolderItem: (args: { parentId: string; folderItem: any }) => void;
}

export const useFoldersStore = (): foldersStore => {
  const dispatch: AppDispatch = useDispatch();
  const folderGroupList = useSelector((state: RootState) => state.foldersState.folderGroupList);

  const addFolderGroup = useCallback(
    (args: { parentId: string; folderItems: any[] }) => {
      dispatch(foldersActions.addFolderGroup(args));
    },
    [dispatch],
  );

  const addOneFolderItem = useCallback(
    (args: { parentId: string; folderItem: any }) => {
      dispatch(foldersActions.addOneFolderItem(args));
    },
    [dispatch],
  );

  return {
    folderGroupList,
    addFolderGroup,
    addOneFolderItem,
  } as const;
};
