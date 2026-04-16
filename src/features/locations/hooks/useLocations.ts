/**
 * @file features/locations/hooks/useLocations.ts
 * @description Infinite-scroll hook for paginated locations list.
 */

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchLocations } from '../../../api/locations';

export function useLocations() {
  return useInfiniteQuery({
    queryKey: ['locations', 'list'],
    queryFn: ({ pageParam }) => fetchLocations(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;
      const url = new URL(lastPage.info.next);
      return Number(url.searchParams.get('page'));
    },
    staleTime: 10 * 60 * 1000,
  });
}
