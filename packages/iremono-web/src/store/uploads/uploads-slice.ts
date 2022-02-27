import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadItem {
  id: string;
  fileName?: string;
  progress: number;
  isCompleted?: boolean;
  uploadedSize?: string;
}

interface UploadsState {
  uploadItemList: UploadItem[];
  showProgress: boolean;
}

const initialState: UploadsState = {
  uploadItemList: [],
  showProgress: false,
};

const uploadsSlice = createSlice({
  name: 'uploadsSlice',
  initialState,
  reducers: {
    addUploadItem: (state, { payload }: PayloadAction<{ uploadItem: UploadItem }>) => {
      state.uploadItemList.push(payload.uploadItem);
      state.showProgress = true;
    },
    updateUploadItem: (state, { payload }: PayloadAction<{ uploadItem: UploadItem }>) => {
      state.uploadItemList = state.uploadItemList.map((item) => {
        if (item.id === payload.uploadItem.id) {
          if (payload.uploadItem.progress) item.progress = payload.uploadItem.progress;
          if (payload.uploadItem.isCompleted) item.isCompleted = payload.uploadItem.isCompleted;
          if (payload.uploadItem.uploadedSize) item.uploadedSize = payload.uploadItem.uploadedSize;
        }
        return item;
      });
    },
    clearUploadItems: (state, { payload }: PayloadAction<void>) => {
      state.uploadItemList = [];
      state.showProgress = false;
    },
  },
});

export const uploadsActions = uploadsSlice.actions;
export const uploadsReducer = uploadsSlice.reducer;
