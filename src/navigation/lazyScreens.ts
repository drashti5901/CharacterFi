/**
 * @file navigation/lazyScreens.ts
 * @description Central source of all React.lazy screen imports.
 * Consumed by each stack navigator to enable Suspense-based code splitting.
 */
import { lazy } from 'react';

// Characters
export const CharacterListScreen = lazy(
  () => import('../features/characters/screens/CharacterListScreen'),
);
export const CharacterDetailScreen = lazy(
  () => import('../features/characters/screens/CharacterDetailScreen'),
);

// Episodes
export const EpisodeListScreen = lazy(
  () => import('../features/episodes/screens/EpisodeListScreen'),
);
export const EpisodeDetailScreen = lazy(
  () => import('../features/episodes/screens/EpisodeDetailScreen'),
);

// Locations
export const LocationListScreen = lazy(
  () => import('../features/locations/screens/LocationListScreen'),
);
export const LocationDetailScreen = lazy(
  () => import('../features/locations/screens/LocationDetailScreen'),
);

// Favourites
export const FavouritesScreen = lazy(
  () => import('../features/favourites/screens/FavouritesScreen'),
);
