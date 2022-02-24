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
      const indexOfFileGroup = state.folderGroupList.findIndex((group) => group.parentId === payload.parentId);
      if (indexOfFileGroup < 0) {
        const folderGroup = { parentId: payload.parentId, folderItems: payload.folderItems };
        state.folderGroupList.push(folderGroup);
        return;
      }
      state.folderGroupList[indexOfFileGroup].folderItems = payload.folderItems;
    },
    addOneFolderItem: (state, { payload }: PayloadAction<{ folderItem: any; parentId: string }>) => {
      const indexOfGroup = state.folderGroupList.findIndex((group) => group.parentId === payload.parentId);
      state.folderGroupList[indexOfGroup].folderItems.push(payload.folderItem);
    },
    updateFolderItem: (state, { payload }: PayloadAction<{ folderItem: any; parentId: string }>) => {
      const indexOfFileGroup = state.folderGroupList.findIndex((group) => group.parentId === payload.parentId);
      const indexOfFolderItem = state.folderGroupList[indexOfFileGroup].folderItems.findIndex(
        (item) => item.id === payload.folderItem.id,
      );
      state.folderGroupList[indexOfFileGroup].folderItems[indexOfFolderItem] = payload.folderItem;
    },
    removeFolderItem: (state, { payload }: PayloadAction<{ folderItem: any; parentId: string }>) => {
      const indexOfFileGroup = state.folderGroupList.findIndex((group) => group.parentId === payload.parentId);
      const indexOfFolderItem = state.folderGroupList[indexOfFileGroup].folderItems.findIndex(
        (item) => item.id === payload.folderItem.id,
      );
      state.folderGroupList[indexOfFileGroup].folderItems.splice(indexOfFolderItem, 1);
    },
  },
});

export const foldersActions = foldersSlice.actions;
export const foldersReducer = foldersSlice.reducer;
