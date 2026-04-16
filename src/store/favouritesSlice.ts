/**
 * @file store/favouritesSlice.ts
 * @description Redux Toolkit slice for managing favourite characters.
 * Reads/writes to SQLite on every add/remove operation.
 * Supports offline usage via pre-loaded SQLite data.
 */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addFavouriteToDB,
  loadFavouritesFromDB,
  removeFavouriteFromDB,
} from '../api/database';
import type { Character } from '../shared/types/api';

/** Shape of the favourites slice state */
interface FavouritesState {
  items: Character[];
  isLoaded: boolean;
  error: string | null;
}

const initialState: FavouritesState = {
  items: [],
  isLoaded: false,
  error: null,
};

/**
 * Thunk — loads all favourites from SQLite on app startup.
 */
export const loadFavourites = createAsyncThunk(
  'favourites/load',
  async () => {
    const items = await loadFavouritesFromDB();
    return items;
  }
);

/**
 * Thunk — adds a character to SQLite then updates Redux state.
 * @param character - Character to add
 */
export const addFavourite = createAsyncThunk(
  'favourites/add',
  async (character: Character) => {
    await addFavouriteToDB(character);
    return character;
  }
);

/**
 * Thunk — removes a character from SQLite then updates Redux state.
 * @param id - Character ID to remove
 */
export const removeFavourite = createAsyncThunk(
  'favourites/remove',
  async (id: number) => {
    await removeFavouriteFromDB(id);
    return id;
  }
);

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    // Optimistic updates — flip state immediately, SQLite thunk syncs in background
    toggleFavouriteOptimistic: (state, action: PayloadAction<Character>) => {
      const idx = state.items.findIndex((c) => c.id === action.payload.id);
      if (idx === -1) {
        state.items.push(action.payload);
      } else {
        state.items.splice(idx, 1);
      }
    },
  },
  extraReducers: (builder) => {
    // Load
    builder.addCase(loadFavourites.fulfilled, (state, action: PayloadAction<Character[]>) => {
      state.items = action.payload;
      state.isLoaded = true;
      state.error = null;
    });
    builder.addCase(loadFavourites.rejected, (state, action) => {
      state.error = action.error.message ?? 'Failed to load favourites';
      state.isLoaded = true;
    });

    // Add
    builder.addCase(addFavourite.fulfilled, (state, action: PayloadAction<Character>) => {
      const exists = state.items.some((c) => c.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    });

    // Remove
    builder.addCase(removeFavourite.fulfilled, (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((c) => c.id !== action.payload);
    });
  },
});

export const { toggleFavouriteOptimistic } = favouritesSlice.actions;
export default favouritesSlice.reducer;
