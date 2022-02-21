import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilesState {
  fileGroupList: { parentId: string; fileItems: any[] }[];
}

const initialState: FilesState = {
  fileGroupList: [],
};

const filesSlice = createSlice({
  name: 'filesSlice',
  initialState,
  reducers: {
    addFileGroup: (state, { payload }: PayloadAction<{ fileItems: any[]; parentId: string }>) => {
      const fileGroup = { parentId: payload.parentId, fileItems: payload.fileItems };
      state.fileGroupList.push(fileGroup);
    },
    addOneFileItem: (state, { payload }: PayloadAction<{ fileItem: any; parentId: string }>) => {
      const indexOfGroup = state.fileGroupList.findIndex((group) => group.parentId === payload.parentId);
      state.fileGroupList[indexOfGroup].fileItems.push(payload.fileItem);
    },
  },
});

export const filesActions = filesSlice.actions;
export const filesReducer = filesSlice.reducer;
