/**
 * @file shared/queryClient.ts
 * @description TanStack Query client singleton shared across the app.
 * Configures default stale time, retry behaviour, and window focus refetch.
 */
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
