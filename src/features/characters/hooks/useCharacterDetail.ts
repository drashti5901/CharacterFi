/**
 * @file features/characters/hooks/useCharacterDetail.ts
 * @description React Query hook that fetches a single character + its episodes.
 */

import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../../../api/characters';
import apiClient from '../../../api/client';
import type { Episode } from '../../../shared/types/api';

/** Extract numeric IDs from episode URL array */
function episodeIdsFromUrls(urls: string[]): number[] {
  return urls.map((url) => Number(url.split('/').pop())).filter(Boolean);
}

/** Fetch multiple episodes by their IDs in one request */
async function fetchEpisodesByIds(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const res = await apiClient.get<Episode>(`/episode/${ids[0]}`);
    return [res.data];
  }
  const res = await apiClient.get<Episode[]>(`/episode/${ids.join(',')}`);
  return res.data;
}

export function useCharacterDetail(characterId: number) {
  const characterQuery = useQuery({
    queryKey: ['characters', 'detail', characterId],
    queryFn: () => fetchCharacterById(characterId),
    staleTime: 5 * 60 * 1000,
  });

  const episodeIds = characterQuery.data
    ? episodeIdsFromUrls(characterQuery.data.episode)
    : [];

  const episodesQuery = useQuery({
    queryKey: ['episodes', 'byIds', episodeIds],
    queryFn: () => fetchEpisodesByIds(episodeIds),
    enabled: episodeIds.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  return {
    character: characterQuery.data,
    episodes: episodesQuery.data ?? [],
    isLoading: characterQuery.isLoading,
    isError: characterQuery.isError,
    isEpisodesLoading: episodesQuery.isLoading,
    refetch: characterQuery.refetch,
  };
}
