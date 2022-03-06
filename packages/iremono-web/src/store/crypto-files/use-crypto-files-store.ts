import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { cryptoFilesActions } from './crypto-files-slice';

interface CryptoFilesStore {
  fileGroupList: RootState['cryptoFilesState']['fileGroupList'];
  addFileGroup: (args: { fileItems: any[]; parentId: string }) => void;
  addOneFileItem: (args: { fileItem: any; parentId: string }) => void;
  updateFileItem: (args: { fileItem: any; parentId: string }) => void;
  removeFileItem: (args: { fileItem: any; parentId: string }) => void;
}

export const useCryptoFilesStore = (): CryptoFilesStore => {
  const dispatch: AppDispatch = useDispatch();
  const fileGroupList = useSelector((state: RootState) => state.filesState.fileGroupList);

  const addFileGroup = useCallback(
    (args: { fileItems: any[]; parentId: string }) => {
      dispatch(cryptoFilesActions.addFileGroup(args));
    },
    [dispatch],
  );

  const addOneFileItem = useCallback(
    (args: { fileItem: any; parentId: string }) => {
      dispatch(cryptoFilesActions.addOneFileItem(args));
    },
    [dispatch],
  );

  const updateFileItem = useCallback(
    (args: { fileItem: any; parentId: string }) => {
      dispatch(cryptoFilesActions.updateFileItem(args));
    },
    [dispatch],
  );

  const removeFileItem = useCallback(
    (args: { fileItem: any; parentId: string }) => {
      dispatch(cryptoFilesActions.removeFileItem(args));
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
