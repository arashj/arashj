import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import counterSlice from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    counter: counterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;