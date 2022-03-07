import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  storageItemViewMode: 'grid' | 'list';
}

const initialState: UIState = {
  storageItemViewMode: 'grid',
};

export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    toggleStorageItemViewMode: (state, { payload }: PayloadAction) => {
      state.storageItemViewMode = state.storageItemViewMode === 'grid' ? 'list' : 'grid';
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
