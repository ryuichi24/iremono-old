import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface FolderGroup {
  parentId: string;
  folderItems: any[];
  ancestors: any[];
  isRootFolder: boolean;
}

interface FoldersState {
  folderGroupList: FolderGroup[];
}

const initialState: FoldersState = {
  folderGroupList: [],
};

export const foldersSlice = createSlice({
  name: 'foldersSlice',
  initialState,
  reducers: {
    addFolderGroup: (state, { payload }: PayloadAction<{ folderItems: any[]; folder: any; ancestors: any[] }>) => {
      const indexOfFileGroup = state.folderGroupList.findIndex((group) => group.parentId === payload.folder.id);
      if (indexOfFileGroup < 0) {
        const folderGroup = {
          parentId: payload.folder.id,
          folderItems: payload.folderItems,
          isRootFolder: payload.folder.isRootFolder,
          ancestors: payload.ancestors,
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

// selectors
export const folderGroupListSelector = createSelector(
  (state: RootState) => state.foldersState,
  (foldersState) => foldersState.folderGroupList,
);

export const folderGroupByIdSelector = createSelector(
  [folderGroupListSelector, (state: RootState, parentId: string) => parentId],
  (groupList, parentId) => groupList.find((group) => group.parentId === parentId),
);

export const rootFolderGroupSelector = createSelector([folderGroupListSelector], (groupList) =>
  groupList.find((group) => group.isRootFolder),
);

export const ancestorsByFolderIdSelector = createSelector(
  [folderGroupListSelector, (state: RootState, parentId: string) => parentId],
  (groupList, parentId) => groupList.find((group) => group.parentId === parentId)?.ancestors,
);

//
export const foldersActions = foldersSlice.actions;
export default foldersSlice.reducer;
