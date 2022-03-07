import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: { userId: string | null; email: string | null };
  isAuthenticated: boolean;
  clientEncryptionKey?: string;
}

const initialState: AuthState = {
  user: { userId: null, email: null },
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (
      state,
      { payload }: PayloadAction<{ userId: AuthState['user']['userId']; email: AuthState['user']['email'] }>,
    ) => {
      state.isAuthenticated = true;
      state.user.userId = payload.userId;
      state.user.email = payload.email;
    },
    setClientEncryptionKey: (
      state,
      { payload }: PayloadAction<{ clientEncryptionKey: AuthState['clientEncryptionKey'] }>,
    ) => {
      state.clientEncryptionKey = payload.clientEncryptionKey;
    },
    clearAuth: (state, _: PayloadAction<void>) => {
      state.isAuthenticated = false;
      state.user.userId = null;
      state.user.email = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
