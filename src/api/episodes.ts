/**
 * @file api/episodes.ts
 * @description API service functions for Episode endpoints.
 */

import apiClient from './client';
import type { Episode, EpisodeFilters, PaginatedResponse } from '../shared/types/api';

/**
 * Fetch a paginated list of episodes with optional filters.
 * @param page - Page number (1-based)
 * @param filters - Optional filter parameters
 * @returns Paginated episode response
 */
export async function fetchEpisodes(
  page: number,
  filters: EpisodeFilters = {}
): Promise<PaginatedResponse<Episode>> {
  const params: Record<string, string | number> = { page };
  if (filters.name) params.name = filters.name;
  if (filters.episode) params.episode = filters.episode;

  const response = await apiClient.get<PaginatedResponse<Episode>>('/episode', { params });
  return response.data;
}

/**
 * Fetch a single episode by ID.
 * @param id - Episode ID
 * @returns Full episode object
 */
export async function fetchEpisodeById(id: number): Promise<Episode> {
  const response = await apiClient.get<Episode>(`/episode/${id}`);
  return response.data;
}
