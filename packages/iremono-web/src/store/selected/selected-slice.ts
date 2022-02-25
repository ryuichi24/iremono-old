import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedState {
  selectedItem: any | null;
}

const initialState: SelectedState = {
  selectedItem: null,
};

const selectedSlice = createSlice({
  name: 'selectedSlice',
  initialState,
  reducers: {
    setSelectedItem: (state, { payload }: PayloadAction<{ selectedItem: SelectedState['selectedItem'] }>) => {
      state.selectedItem = payload.selectedItem;
    },
  },
});

export const selectedActions = selectedSlice.actions;
export const selectedReducer = selectedSlice.reducer;
