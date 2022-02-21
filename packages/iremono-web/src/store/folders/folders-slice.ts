import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FoldersState {
  folderGroupList: { parentId: string; folderItems: any[] }[];
}

const initialState: FoldersState = {
  folderGroupList: [],
};

const foldersSlice = createSlice({
  name: 'foldersSlice',
  initialState,
  reducers: {
    addFolderGroup: (state, { payload }: PayloadAction<{ folderItems: any[]; parentId: string }>) => {
      const folderGroup = { parentId: payload.parentId, folderItems: payload.folderItems };
      state.folderGroupList.push(folderGroup);
    },
    addOneFolderItem: (state, { payload }: PayloadAction<{ folderItem: any; parentId: string }>) => {
      const indexOfGroup = state.folderGroupList.findIndex((group) => group.parentId === payload.parentId);
      state.folderGroupList[indexOfGroup].folderItems.push(payload.folderItem);
    },
  },
});

export const foldersActions = foldersSlice.actions;
export const foldersReducer = foldersSlice.reducer;
