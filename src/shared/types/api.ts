/**
 * @file types/api.ts
 * @description All API response type definitions for the Rick and Morty API.
 * Strictly typed — no `any` allowed.
 */

/** Pagination info returned by list endpoints */
export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

/** Generic paginated API response */
export interface PaginatedResponse<T> {
  info: ApiInfo;
  results: T[];
}

/** Character status values */
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

/** Character gender values */
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

/** Location reference embedded in character */
export interface CharacterLocation {
  name: string;
  url: string;
}

/** Full Character object from API */
export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

/** Full Episode object from API */
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string; // e.g. "S01E01"
  characters: string[];
  url: string;
  created: string;
}

/** Full Location object from API */
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

/** Character filter parameters */
export interface CharacterFilters {
  name?: string;
  status?: CharacterStatus | '';
  species?: string;
  gender?: CharacterGender | '';
}

/** Episode filter parameters */
export interface EpisodeFilters {
  name?: string;
  episode?: string;
}

/** Location filter parameters */
export interface LocationFilters {
  name?: string;
  type?: string;
  dimension?: string;
}
