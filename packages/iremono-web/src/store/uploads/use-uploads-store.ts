import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../';
import { uploadsActions } from './uploads-slice';

interface UploadsStore {
  uploadItemList: RootState['uploadsState']['uploadItemList'];
  addUploadItem: (args: { uploadItem: any }) => void;
  updateUploadItem: (args: { uploadItem: any }) => void;
}

export const useUploadsStore = (): UploadsStore => {
  const dispatch: AppDispatch = useDispatch();
  const uploadItemList = useSelector((state: RootState) => state.uploadsState.uploadItemList);

  const addUploadItem = useCallback(
    (args: { uploadItem: any }) => {
      dispatch(uploadsActions.addUploadItem(args));
    },
    [dispatch],
  );

  const updateUploadItem = useCallback(
    (args: { uploadItem: any }) => {
      dispatch(uploadsActions.updateUploadItem(args));
    },
    [dispatch],
  );

  return { addUploadItem, uploadItemList, updateUploadItem } as const;
};
