/**
 * @file api/locations.ts
 * @description API service functions for Location endpoints.
 */

import apiClient from './client';
import type { Location, LocationFilters, PaginatedResponse } from '../shared/types/api';

/**
 * Fetch a paginated list of locations with optional filters.
 * @param page - Page number (1-based)
 * @param filters - Optional filter parameters
 * @returns Paginated location response
 */
export async function fetchLocations(
  page: number,
  filters: LocationFilters = {}
): Promise<PaginatedResponse<Location>> {
  const params: Record<string, string | number> = { page };
  if (filters.name) params.name = filters.name;
  if (filters.type) params.type = filters.type;
  if (filters.dimension) params.dimension = filters.dimension;

  const response = await apiClient.get<PaginatedResponse<Location>>('/location', { params });
  return response.data;
}

/**
 * Fetch a single location by ID.
 * @param id - Location ID
 * @returns Full location object
 */
export async function fetchLocationById(id: number): Promise<Location> {
  const response = await apiClient.get<Location>(`/location/${id}`);
  return response.data;
}
