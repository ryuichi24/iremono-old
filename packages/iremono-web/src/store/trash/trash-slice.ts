import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface TrashState {
  folderTrashItemList: any[];
  fileTrashItemList: any[];
  cryptoFolderTrashItemList: any[];
  cryptoFileTrashItemList: any[];
}

const initialState: TrashState = {
  folderTrashItemList: [],
  fileTrashItemList: [],
  cryptoFolderTrashItemList: [],
  cryptoFileTrashItemList: [],
};

export const trashSlice = createSlice({
  name: 'trashSlice',
  initialState,
  reducers: {
    setTrashItems: (state, { payload }: PayloadAction<{ trashItems: any[] }>) => {
      const folderTrashItems = payload.trashItems.filter((item) => item.isFolder);
      const fileTrashItems = payload.trashItems.filter((item) => !item.isFolder);
      state.folderTrashItemList = folderTrashItems;
      state.fileTrashItemList = fileTrashItems;
    },
    removeTrashItem: (state, { payload }: PayloadAction<{ trashItem: any }>) => {
      if (payload.trashItem.isFolder) {
        const indexOfTrashItem = state.folderTrashItemList.findIndex((item) => item.id === payload.trashItem.id);
        state.folderTrashItemList.splice(indexOfTrashItem, 1);
      }

      if (!payload.trashItem.isFolder) {
        const indexOfTrashItem = state.fileTrashItemList.findIndex((item) => item.id === payload.trashItem.id);
        state.fileTrashItemList.splice(indexOfTrashItem, 1);
      }
    },
    setCryptoTrashItems: (state, { payload }: PayloadAction<{ trashItems: any[] }>) => {
      const folderTrashItems = payload.trashItems.filter((item) => item.isFolder);
      const fileTrashItems = payload.trashItems.filter((item) => !item.isFolder);
      state.cryptoFolderTrashItemList = folderTrashItems;
      state.cryptoFileTrashItemList = fileTrashItems;
    },
    removeCryptoTrashItem: (state, { payload }: PayloadAction<{ trashItem: any }>) => {
      if (payload.trashItem.isFolder) {
        const indexOfTrashItem = state.cryptoFolderTrashItemList.findIndex((item) => item.id === payload.trashItem.id);
        state.cryptoFolderTrashItemList.splice(indexOfTrashItem, 1);
      }

      if (!payload.trashItem.isFolder) {
        const indexOfTrashItem = state.cryptoFileTrashItemList.findIndex((item) => item.id === payload.trashItem.id);
        state.cryptoFileTrashItemList.splice(indexOfTrashItem, 1);
      }
    },
  },
});

// selectors
export const folderTrashItemListSelector = createSelector(
  (state: RootState) => state.trashState,
  (trashState) => trashState.folderTrashItemList,
);

export const fileTrashItemListSelector = createSelector(
  (state: RootState) => state.trashState,
  (trashState) => trashState.fileTrashItemList,
);

export const cryptoFolderTrashItemListSelector = createSelector(
  (state: RootState) => state.trashState,
  (trashState) => trashState.cryptoFolderTrashItemList,
);

export const cryptoFileTrashItemListSelector = createSelector(
  (state: RootState) => state.trashState,
  (trashState) => trashState.cryptoFileTrashItemList,
);

export const trashActions = trashSlice.actions;
export default trashSlice.reducer;
