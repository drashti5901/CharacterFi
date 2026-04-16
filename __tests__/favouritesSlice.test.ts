/**
 * @file __tests__/favouritesSlice.test.ts
 * @description Unit tests for the favourites Redux slice.
 */

import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer, {
  addFavourite,
  loadFavourites,
  removeFavourite,
} from '../src/store/favouritesSlice';
import type { Character } from '../src/shared/types/api';

/** Mock the SQLite database module */
jest.mock('../src/api/database', () => ({
  loadFavouritesFromDB: jest.fn(),
  addFavouriteToDB: jest.fn(),
  removeFavouriteFromDB: jest.fn(),
}));

import {
  addFavouriteToDB,
  loadFavouritesFromDB,
  removeFavouriteFromDB,
} from '../src/api/database';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
  location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

function makeStore() {
  return configureStore({ reducer: { favourites: favouritesReducer } });
}

describe('favouritesSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('has correct initial state', () => {
    const store = makeStore();
    const { items, isLoaded, error } = store.getState().favourites;
    expect(items).toEqual([]);
    expect(isLoaded).toBe(false);
    expect(error).toBeNull();
  });

  it('loadFavourites.fulfilled populates items and sets isLoaded', async () => {
    (loadFavouritesFromDB as jest.Mock).mockResolvedValue([mockCharacter]);
    const store = makeStore();

    await store.dispatch(loadFavourites());

    const { items, isLoaded } = store.getState().favourites;
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(1);
    expect(isLoaded).toBe(true);
  });

  it('loadFavourites.rejected sets error and isLoaded', async () => {
    (loadFavouritesFromDB as jest.Mock).mockRejectedValue(new Error('DB error'));
    const store = makeStore();

    await store.dispatch(loadFavourites());

    const { error, isLoaded } = store.getState().favourites;
    expect(error).toBe('DB error');
    expect(isLoaded).toBe(true);
  });

  it('addFavourite.fulfilled appends character', async () => {
    (addFavouriteToDB as jest.Mock).mockResolvedValue(undefined);
    const store = makeStore();

    await store.dispatch(addFavourite(mockCharacter));

    expect(store.getState().favourites.items).toHaveLength(1);
    expect(addFavouriteToDB).toHaveBeenCalledWith(mockCharacter);
  });

  it('addFavourite does not duplicate existing character', async () => {
    (addFavouriteToDB as jest.Mock).mockResolvedValue(undefined);
    const store = makeStore();

    await store.dispatch(addFavourite(mockCharacter));
    await store.dispatch(addFavourite(mockCharacter));

    expect(store.getState().favourites.items).toHaveLength(1);
  });

  it('removeFavourite.fulfilled removes character by id', async () => {
    (addFavouriteToDB as jest.Mock).mockResolvedValue(undefined);
    (removeFavouriteFromDB as jest.Mock).mockResolvedValue(undefined);
    const store = makeStore();

    await store.dispatch(addFavourite(mockCharacter));
    await store.dispatch(removeFavourite(mockCharacter.id));

    expect(store.getState().favourites.items).toHaveLength(0);
    expect(removeFavouriteFromDB).toHaveBeenCalledWith(mockCharacter.id);
  });
});
