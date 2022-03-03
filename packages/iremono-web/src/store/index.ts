import { combineReducers, Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth/auth-slice';
import { filesReducer } from './files/files-slice';
import { foldersReducer } from './folders/folders-slice';
import { trashReducer } from './trash/trash-slice';
import { selectedReducer } from './selected/selected-slice';
import { uploadsReducer } from './uploads/uploads-slice';

const combinedReducers = combineReducers({
  authState: authReducer,
  filesState: filesReducer,
  foldersState: foldersReducer,
  trashState: trashReducer,
  selectedState: selectedReducer,
  uploadsState: uploadsReducer,
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
