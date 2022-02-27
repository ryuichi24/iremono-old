import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { uploadsActions } from './uploads-slice';

type UploadItemList = RootState['uploadsState']['uploadItemList'];

interface UploadsStore {
  uploadItemList: UploadItemList;
  showProgress: boolean;
  addUploadItem: (args: { uploadItem: UploadItemList[0] }) => void;
  updateUploadItem: (args: { uploadItem: UploadItemList[0] }) => void;
  clearUploadItems: () => void;
}

export const useUploadsStore = (): UploadsStore => {
  const dispatch: AppDispatch = useDispatch();
  const uploadItemList = useSelector((state: RootState) => state.uploadsState.uploadItemList);
  const showProgress = useSelector((state: RootState) => state.uploadsState.showProgress);

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

  return { addUploadItem, showProgress, uploadItemList, updateUploadItem, clearUploadItems } as const;
};
