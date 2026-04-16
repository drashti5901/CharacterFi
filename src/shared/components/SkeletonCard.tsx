/**
 * @file shared/components/SkeletonCard.tsx
 * @description Animated shimmer skeleton placeholder for character cards.
 * Uses React Native Animated API — no third-party shimmer lib.
 */

import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import styles from './SkeletonCard.styles';

/**
 * Single shimmer block that pulses between skeleton and highlight colours.
 */
function ShimmerBlock({ style }: { style: object }) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.shimmer, style, { opacity }]}
    />
  );
}

/**
 * Skeleton placeholder that matches the CharacterCard layout.
 */
function SkeletonCard() {
  return (
    <View style={styles.card}>
      <ShimmerBlock style={styles.avatar} />
      <View style={styles.info}>
        <ShimmerBlock style={styles.titleLine} />
        <ShimmerBlock style={styles.subtitleLine} />
        <ShimmerBlock style={styles.labelLine} />
        <ShimmerBlock style={styles.locationLine} />
      </View>
    </View>
  );
}

/**
 * Renders N skeleton cards while data is loading.
 * @param count - Number of skeleton cards to render (default: 6)
 */
export function SkeletonList({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}

export default SkeletonCard;
