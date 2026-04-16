/**
 * @file features/episodes/hooks/useEpisodes.ts
 * @description Infinite-scroll hook for paginated episodes list.
 */

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchEpisodes } from '../../../api/episodes';

export function useEpisodes() {
  return useInfiniteQuery({
    queryKey: ['episodes', 'list'],
    queryFn: ({ pageParam }) => fetchEpisodes(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;
      const url = new URL(lastPage.info.next);
      return Number(url.searchParams.get('page'));
    },
    staleTime: 10 * 60 * 1000, // episodes never change — cache 10 min
  });
}
