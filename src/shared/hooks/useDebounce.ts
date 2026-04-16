/**
 * @file shared/hooks/useDebounce.ts
 * @description Custom useDebounce hook written from scratch.
 * No lodash or external debounce libraries used.
 * Fully typed with TypeScript generics.
 */

import { useEffect, useState } from 'react';

/**
 * Debounces a value by the specified delay.
 * Returns the debounced value only after the delay has elapsed
 * since the last change to the input value.
 *
 * @template T - The type of the value being debounced
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300)
 * @returns The debounced value
 *
 * @example
 * const debouncedSearch = useDebounce(searchText, 300);
 * // Only fires API call when user stops typing for 300ms
 */
function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel timeout if value changes before delay elapses
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
