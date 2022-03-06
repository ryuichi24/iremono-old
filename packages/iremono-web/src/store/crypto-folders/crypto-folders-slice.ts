import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FolderGroup {
  parentId: string;
  folderItems: any[];
  ancestors: any[];
  isRootFolder: boolean;
}

interface CryptoFoldersState {
  folderGroupList: FolderGroup[];
}

const initialState: CryptoFoldersState = {
  folderGroupList: [],
};

const cryptoFoldersSlice = createSlice({
  name: 'cryptoFoldersSlice',
  initialState,
  reducers: {
    addFolderGroup: (state, { payload }: PayloadAction<{ folderItems: any[]; folder: any; ancestors: any[] }>) => {
      const indexOfFileGroup = state.folderGroupList.findIndex((group) => group.parentId === payload.folder.id);
      if (indexOfFileGroup < 0) {
        const folderGroup = {
          parentId: payload.folder.id,
          folderItems: payload.folderItems,
          isRootFolder: payload.folder.isRootFolder,
          ancestors: payload.ancestors.slice().reverse(),
        };
        state.folderGroupList.push(folderGroup);
        return;
      }
      state.folderGroupList[indexOfFileGroup].folderItems = payload.folderItems;
      state.folderGroupList[indexOfFileGroup].ancestors = payload.ancestors;
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

      for (let index = 0; index < state.folderGroupList.length; index++) {
        const indexOfAncestor = state.folderGroupList[index].ancestors.findIndex(
          (ancestor) => ancestor.id === payload.folderItem.id,
        );

        state.folderGroupList[index].ancestors[indexOfAncestor] = payload.folderItem;
      }
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

export const cryptoFoldersActions = cryptoFoldersSlice.actions;
export const cryptoFoldersReducer = cryptoFoldersSlice.reducer;
