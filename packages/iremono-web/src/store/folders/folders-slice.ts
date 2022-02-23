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
    addOneFolderItem: (state, { payload }: PayloadAction<{ folderItem: any }>) => {
      const indexOfGroup = state.folderGroupList.findIndex((group) => group.parentId === payload.folderItem.parentId);
      state.folderGroupList[indexOfGroup].folderItems.push(payload.folderItem);
    },
    updateFolderItem: (state, { payload }: PayloadAction<{ folderItem: any }>) => {
      const indexOfFileGroup = state.folderGroupList.findIndex(
        (group) => group.parentId === payload.folderItem.parentId,
      );
      const indexOfFolderItem = state.folderGroupList[indexOfFileGroup].folderItems.findIndex(
        (item) => item.id === payload.folderItem.id,
      );
      state.folderGroupList[indexOfFileGroup].folderItems[indexOfFolderItem] = payload.folderItem;
    },
  },
});

export const foldersActions = foldersSlice.actions;
export const foldersReducer = foldersSlice.reducer;
