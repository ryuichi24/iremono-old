import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '..';
import { filesActions } from './files-slice';

interface FilesActions {
  addFileGroup: (args: { fileItems: any[]; parentId: string }) => void;
  addOneFileItem: (args: { fileItem: any; parentId: string }) => void;
  updateFileItem: (args: { fileItem: any; parentId: string }) => void;
  removeFileItem: (args: { fileItem: any; parentId: string }) => void;
}

export const useFilesActions = (): FilesActions => {
  const dispatch: AppDispatch = useDispatch();

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
    addOneFileItem,
    addFileGroup,
    updateFileItem,
    removeFileItem,
  } as const;
};
