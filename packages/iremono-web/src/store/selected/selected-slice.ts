import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface SelectedState {
  selectedItem: any | null;
  selectedViewerItem: any | null;
  selectedCurrentFolder: any | null;
  selectedCurrentCryptoFolder: any | null;
}

const initialState: SelectedState = {
  selectedItem: null,
  selectedViewerItem: null,
  selectedCurrentFolder: null,
  selectedCurrentCryptoFolder: null,
};

export const selectedSlice = createSlice({
  name: 'selectedSlice',
  initialState,
  reducers: {
    setSelectedItem: (state, { payload }: PayloadAction<{ selectedItem: SelectedState['selectedItem'] }>) => {
      state.selectedItem = payload.selectedItem;
    },
    setSelectedViewerItem: (
      state,
      { payload }: PayloadAction<{ selectedViewerItem: SelectedState['selectedViewerItem'] }>,
    ) => {
      state.selectedViewerItem = payload.selectedViewerItem;
    },
    setSelectedCurrentFolder: (
      state,
      { payload }: PayloadAction<{ selectedCurrentFolder: SelectedState['selectedCurrentFolder'] }>,
    ) => {
      state.selectedCurrentFolder = payload.selectedCurrentFolder;
    },
    setSelectedCurrentCryptoFolder: (
      state,
      { payload }: PayloadAction<{ selectedCurrentCryptoFolder: SelectedState['selectedCurrentCryptoFolder'] }>,
    ) => {
      state.selectedCurrentCryptoFolder = payload.selectedCurrentCryptoFolder;
    },
  },
});

// selectors
export const selectedItemSelector = createSelector(
  (state: RootState) => state.selectedState,
  (selectedState) => selectedState.selectedItem,
);

export const selectedViewerItemSelector = createSelector(
  (state: RootState) => state.selectedState,
  (selectedState) => selectedState.selectedViewerItem,
);

export const selectedCurrentFolderSelector = createSelector(
  (state: RootState) => state.selectedState,
  (selectedState) => selectedState.selectedCurrentFolder,
);

export const selectedCurrentCryptoFolderSelector = createSelector(
  (state: RootState) => state.selectedState,
  (selectedState) => selectedState.selectedCurrentCryptoFolder,
);

export const selectedActions = selectedSlice.actions;
export default selectedSlice.reducer;
