import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TrashState {
  folderTrashItemList: any[];
  fileTrashItemList: any[];
}

const initialState: TrashState = {
  folderTrashItemList: [],
  fileTrashItemList: [],
};

const trashSlice = createSlice({
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
  },
});

export const trashActions = trashSlice.actions;
export default trashSlice.reducer;
