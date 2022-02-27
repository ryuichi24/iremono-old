import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadsState {
  uploadItemList: any[];
}

const initialState: UploadsState = {
  uploadItemList: [],
};

const uploadsSlice = createSlice({
  name: 'uploadsSlice',
  initialState,
  reducers: {
    addUploadItem: (state, { payload }: PayloadAction<{ uploadItem: any }>) => {
      state.uploadItemList.push(payload.uploadItem);
    },
    updateUploadItem: (state, { payload }: PayloadAction<{ uploadItem: any }>) => {
      state.uploadItemList = state.uploadItemList.map((item) => {
        if (item.id === payload.uploadItem.id) {
          item.progress = payload.uploadItem.progress;
          item.isCompleted = payload.uploadItem.isCompleted;
          item.uploadedSize = payload.uploadItem.uploadedSize;
        }
        return item;
      });
    },
  },
});

export const uploadsActions = uploadsSlice.actions;
export const uploadsReducer = uploadsSlice.reducer;
