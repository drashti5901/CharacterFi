/**
 * @file types/navigation.ts
 * @description React Navigation type definitions for all stacks and tabs.
 */

import type { Character } from './api';

/** Root tab navigator param list */
export type RootTabParamList = {
  Characters: undefined;
  Episodes: undefined;
  Locations: undefined;
  Favourites: undefined;
};

/** Characters stack navigator param list */
export type CharactersStackParamList = {
  CharacterList: undefined;
  CharacterDetail: { characterId: number };
  EpisodeDetail: { episodeId: number; episodeName: string };
};

/** Episodes stack navigator param list */
export type EpisodesStackParamList = {
  EpisodeList: undefined;
  EpisodeDetail: { episodeId: number; episodeName: string };
};

/** Locations stack navigator param list */
export type LocationsStackParamList = {
  LocationList: undefined;
  LocationDetail: { locationId: number; locationName: string };
};

/** Favourites stack navigator param list */
export type FavouritesStackParamList = {
  FavouritesList: undefined;
  FavouriteDetail: { characterId: number };
  EpisodeDetail: { episodeId: number; episodeName: string };
};
