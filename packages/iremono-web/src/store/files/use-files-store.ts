import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { filesActions } from './files-slice';

interface FilesStore {
  fileGroupList: RootState['filesState']['fileGroupList'];
  addFileGroup: (args: { fileItems: any[]; parentId: string }) => void;
  addOneFileItem: (args: { fileItem: any; parentId: string }) => void;
  updateFileItem: (args: { fileItem: any; parentId: string }) => void;
  removeFileItem: (args: { fileItem: any; parentId: string }) => void;
}

export const useFilesStore = (): FilesStore => {
  const dispatch: AppDispatch = useDispatch();
  const fileGroupList = useSelector((state: RootState) => state.filesState.fileGroupList);

  const addFileGroup = useCallback(
    (args: { fileItems: any[]; parentId: string }) => {
      dispatch(filesActions.addFileGroup(args));
    },
    [dispatch],
  );

  const addOneFileItem = useCallback(
    (args: { fileItem: any; parentId: string }) => {
      dispatch(filesActions.addOneFileItem(args));
    },
    [dispatch],
  );

  const updateFileItem = useCallback(
    (args: { fileItem: any; parentId: string }) => {
      dispatch(filesActions.updateFileItem(args));
    },
    [dispatch],
  );

  const removeFileItem = useCallback(
    (args: { fileItem: any; parentId: string }) => {
      dispatch(filesActions.removeFileItem(args));
    },
    [dispatch],
  );

  return {
    fileGroupList,
    addOneFileItem,
    addFileGroup,
    updateFileItem,
    removeFileItem,
  } as const;
};
