import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth/auth-slice';
import { filesReducer } from './files/files-slice';
import { foldersReducer } from './folders/folders-slice';

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  reducer: {
    authState: authReducer,
    filesState: filesReducer,
    foldersState: foldersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
