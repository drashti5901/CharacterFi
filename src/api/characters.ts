/**
 * @file api/characters.ts
 * @description API service functions for Character endpoints.
 * Uses the typed Axios client — no direct fetch() calls.
 */

import apiClient from './client';
import type {
  Character,
  CharacterFilters,
  PaginatedResponse,
} from '../shared/types/api';

/**
 * Fetch a paginated list of characters with optional filters.
 * @param page - Page number (1-based)
 * @param filters - Optional filter parameters
 * @returns Paginated character response
 */
export async function fetchCharacters(
  page: number,
  filters: CharacterFilters = {}
): Promise<PaginatedResponse<Character>> {
  const params: Record<string, string | number> = { page };

  if (filters.name) params.name = filters.name;
  if (filters.status) params.status = filters.status;
  if (filters.species) params.species = filters.species;
  if (filters.gender) params.gender = filters.gender;

  const response = await apiClient.get<PaginatedResponse<Character>>('/character', { params });
  return response.data;
}

/**
 * Fetch a single character by ID.
 * @param id - Character ID
 * @returns Full character detail object
 */
export async function fetchCharacterById(id: number): Promise<Character> {
  const response = await apiClient.get<Character>(`/character/${id}`);
  return response.data;
}

/**
 * Fetch multiple characters by an array of IDs.
 * @param ids - Array of character IDs
 * @returns Array of character objects
 */
export async function fetchCharactersByIds(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const single = await fetchCharacterById(ids[0]);
    return [single];
  }
  const response = await apiClient.get<Character[]>(`/character/${ids.join(',')}`);
  return response.data;
}
