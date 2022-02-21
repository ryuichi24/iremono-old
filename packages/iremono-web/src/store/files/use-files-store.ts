import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { filesActions } from './files-slice';

interface FilesStore {
  fileGroupList: RootState['filesState']['fileGroupList'];
  addFileGroup: (args: { parentId: string; fileItems: any[] }) => void;
  addOneFileItem: (args: { parentId: string; fileItem: any }) => void;
}

export const useFilesStore = (): FilesStore => {
  const dispatch: AppDispatch = useDispatch();
  const fileGroupList = useSelector((state: RootState) => state.filesState.fileGroupList);

  const addFileGroup = useCallback(
    (args: { parentId: string; fileItems: any[] }) => {
      dispatch(filesActions.addFileGroup(args));
    },
    [dispatch],
  );

  const addOneFileItem = useCallback(
    (args: { parentId: string; fileItem: any }) => {
      dispatch(filesActions.addOneFileItem(args));
    },
    [dispatch],
  );

  return {
    fileGroupList,
    addOneFileItem,
    addFileGroup,
  } as const;
};
