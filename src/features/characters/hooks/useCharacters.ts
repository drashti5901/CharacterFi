/**
 * @file features/characters/hooks/useCharacters.ts
 * @description React Query infinite scroll hook for the characters list.
 * Supports name search, status and gender filters.
 */

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../../../api/characters';
import type { CharacterFilters, PaginatedResponse, Character } from '../../../shared/types/api';

/** Query key factory */
export const characterKeys = {
  list: (filters: CharacterFilters) => ['characters', 'list', filters] as const,
};

/**
 * Infinite scroll hook for characters.
 * @param filters - Active search/filter parameters
 */
export function useCharacters(filters: CharacterFilters) {
  return useInfiniteQuery<PaginatedResponse<Character>, Error>({
    queryKey: characterKeys.list(filters),
    queryFn: ({ pageParam = 1 }) => fetchCharacters(pageParam as number, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;
      const url = new URL(lastPage.info.next);
      const next = url.searchParams.get('page');
      return next ? Number(next) : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
}
