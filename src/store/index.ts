/**
 * @file store/index.ts
 * @description Redux Toolkit store configuration.
 * Combines all slices into the root reducer.
 */

import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from './favouritesSlice';
import uiReducer from './uiSlice';

/** Configured Redux store */
export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

/** Root state type */
export type RootState = ReturnType<typeof store.getState>;

/** App dispatch type */
export type AppDispatch = typeof store.dispatch;
