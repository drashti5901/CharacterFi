/**
 * @file shared/hooks/useScrollHeader.ts
 * @description Custom hook implementing hide-on-scroll header animation.
 * Uses React Native's Animated API with translateY — no third-party shortcuts.
 * Header hides when scrolling down and reappears when scrolling up.
 */

import { useRef, useCallback } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

/** Height of the header in points */
const HEADER_HEIGHT = 60;

/** Minimum scroll delta to trigger animation */
const SCROLL_THRESHOLD = 5;

/**
 * Return value from useScrollHeader hook.
 */
interface UseScrollHeaderReturn {
  /** Animated translateY value for the header — bind to style.transform */
  translateY: Animated.Value;
  /** Scroll event handler — bind to onScroll prop of FlatList/ScrollView */
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  /** Header height constant — use for content padding offset */
  headerHeight: number;
}

/**
 * Provides header show/hide animation based on scroll direction.
 * @returns translateY animated value and scroll handler
 *
 * @example
 * const { translateY, onScroll, headerHeight } = useScrollHeader();
 * <Animated.View style={{ transform: [{ translateY }] }}>
 *   <Header />
 * </Animated.View>
 * <FlatList onScroll={onScroll} scrollEventThrottle={16} ... />
 */
function useScrollHeader(height: number = HEADER_HEIGHT): UseScrollHeaderReturn {
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isHeaderVisible = useRef(true);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentScrollY = event.nativeEvent.contentOffset.y;
      const delta = currentScrollY - lastScrollY.current;

      if (Math.abs(delta) < SCROLL_THRESHOLD) return;

      const scrollingDown = delta > 0 && currentScrollY > height;
      const scrollingUp = delta < 0;

      if (scrollingDown && isHeaderVisible.current) {
        isHeaderVisible.current = false;
        Animated.timing(translateY, {
          toValue: -height,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else if (scrollingUp && !isHeaderVisible.current) {
        isHeaderVisible.current = true;
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }

      lastScrollY.current = currentScrollY;
    },
    [translateY, height]
  );

  return { translateY, onScroll, headerHeight: height };
}

export default useScrollHeader;
