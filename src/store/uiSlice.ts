/**
 * @file store/uiSlice.ts
 * @description Redux Toolkit slice for global UI state.
 * Tracks character filters, active tab, and loading flags.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CharacterFilters } from '../shared/types/api';

/** Shape of the UI slice state */
interface UIState {
  characterFilters: CharacterFilters;
  activeTab: string;
}

const initialState: UIState = {
  characterFilters: {
    name: '',
    status: '',
    gender: '',
    species: '',
  },
  activeTab: 'Characters',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * Update character filter parameters.
     * @param state - Current UI state
     * @param action - Partial filters to merge
     */
    setCharacterFilters: (state, action: PayloadAction<Partial<CharacterFilters>>) => {
      state.characterFilters = { ...state.characterFilters, ...action.payload };
    },

    /**
     * Reset all character filters to defaults.
     */
    resetCharacterFilters: (state) => {
      state.characterFilters = { name: '', status: '', gender: '', species: '' };
    },

    /**
     * Set the currently active bottom tab name.
     * @param action - Tab name
     */
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setCharacterFilters, resetCharacterFilters, setActiveTab } = uiSlice.actions;
export default uiSlice.reducer;
