import { combineReducers, Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth/auth-slice';
import { filesReducer } from './files/files-slice';
import { foldersReducer } from './folders/folders-slice';
import { trashReducer } from './trash/trash-slice';
import { selectedReducer } from './selected/selected-slice';
import { uploadsReducer } from './uploads/uploads-slice';
import { cryptoFilesReducer } from './crypto-files/crypto-files-slice';
import { cryptoFoldersReducer } from './crypto-folders/crypto-folders-slice';
import { uiReducer } from './ui/ui-slice';

const combinedReducers = combineReducers({
  authState: authReducer,
  filesState: filesReducer,
  foldersState: foldersReducer,
  cryptoFilesState: cryptoFilesReducer,
  cryptoFoldersState: cryptoFoldersReducer,
  trashState: trashReducer,
  selectedState: selectedReducer,
  uploadsState: uploadsReducer,
  uiState: uiReducer,
});

const rootReducer = (state: any, action: any) => {
  return combinedReducers(state, action);
};

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
