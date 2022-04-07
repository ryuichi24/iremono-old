import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface UIState {
  storageItemViewMode: 'grid' | 'list';
  isSidePanelLeft: boolean;
}

const initialState: UIState = {
  storageItemViewMode: 'grid',
  isSidePanelLeft: false,
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

// selectors
export const storageItemViewModeSelector = createSelector(
  (state: RootState) => state.uiState,
  (uiState) => uiState.storageItemViewMode,
);

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
