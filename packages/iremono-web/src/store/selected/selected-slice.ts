import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedState {
  selectedItem: any | null;
  selectedViewerItem: any | null;
}

const initialState: SelectedState = {
  selectedItem: null,
  selectedViewerItem: null,
};

const selectedSlice = createSlice({
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
  },
});

export const selectedActions = selectedSlice.actions;
export const selectedReducer = selectedSlice.reducer;
