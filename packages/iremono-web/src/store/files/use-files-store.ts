import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { filesActions } from './files-slice';

interface FilesStore {
  fileGroupList: RootState['filesState']['fileGroupList'];
  addFileGroup: (args: { fileItems: any[]; parentId: string }) => void;
  addOneFileItem: (args: { fileItem: any }) => void;
  updateFileItem: (args: { fileItem: any }) => void;
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
    (args: { fileItem: any }) => {
      dispatch(filesActions.addOneFileItem(args));
    },
    [dispatch],
  );

  const updateFileItem = useCallback(
    (args: { fileItem: any }) => {
      dispatch(filesActions.updateFileItem(args));
    },
    [dispatch],
  );

  return {
    fileGroupList,
    addOneFileItem,
    addFileGroup,
    updateFileItem,
  } as const;
};
