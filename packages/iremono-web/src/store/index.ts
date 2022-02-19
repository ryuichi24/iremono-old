import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth/auth-slice';

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  reducer: {
    authState: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
