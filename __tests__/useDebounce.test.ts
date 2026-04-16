/**
 * @file __tests__/useDebounce.test.ts
 * @description Unit tests for the useDebounce<T> custom hook.
 */

import { act, renderHook } from '@testing-library/react-native';
import useDebounce from '../src/shared/hooks/useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));
    expect(result.current).toBe('hello');
  });

  it('does not update value before the delay elapses', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 300),
      { initialProps: { value: 'hello' } },
    );

    rerender({ value: 'world' });
    act(() => { jest.advanceTimersByTime(200); });

    expect(result.current).toBe('hello');
  });

  it('updates value after the delay elapses', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 300),
      { initialProps: { value: 'hello' } },
    );

    rerender({ value: 'world' });
    act(() => { jest.advanceTimersByTime(300); });

    expect(result.current).toBe('world');
  });

  it('resets the timer on rapid successive changes', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 300),
      { initialProps: { value: 'a' } },
    );

    rerender({ value: 'b' });
    act(() => { jest.advanceTimersByTime(200); });
    rerender({ value: 'c' });
    act(() => { jest.advanceTimersByTime(200); });

    // 200 + 200 = 400ms but timer was reset — still within 300ms window
    expect(result.current).toBe('a');

    act(() => { jest.advanceTimersByTime(100); });
    expect(result.current).toBe('c');
  });

  it('works with numeric types', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useDebounce(value, 500),
      { initialProps: { value: 0 } },
    );

    rerender({ value: 42 });
    act(() => { jest.advanceTimersByTime(500); });

    expect(result.current).toBe(42);
  });
});
