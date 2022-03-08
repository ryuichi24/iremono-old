import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '..';
import { uploadsActions } from './uploads-slice';

type UploadItemList = RootState['uploadsState']['uploadItemList'];

interface UploadsActions {
  addUploadItem: (args: { uploadItem: UploadItemList[0] }) => void;
  updateUploadItem: (args: { uploadItem: UploadItemList[0] }) => void;
  clearUploadItems: () => void;
}

export const useUploadsActions = (): UploadsActions => {
  const dispatch: AppDispatch = useDispatch();

  const addUploadItem = useCallback(
    (args: { uploadItem: UploadItemList[0] }) => {
      dispatch(uploadsActions.addUploadItem(args));
    },
    [dispatch],
  );

  const updateUploadItem = useCallback(
    (args: { uploadItem: UploadItemList[0] }) => {
      dispatch(uploadsActions.updateUploadItem(args));
    },
    [dispatch],
  );

  const clearUploadItems = useCallback(() => {
    dispatch(uploadsActions.clearUploadItems());
  }, [dispatch]);

  return { addUploadItem, updateUploadItem, clearUploadItems } as const;
};
