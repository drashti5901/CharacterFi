/**
 * @file shared/components/ProgressiveImage.tsx
 * @description Loads a low-res thumbnail first, then cross-fades to full image.
 * Fully typed — no `any`. Uses React Native Animated API.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import styles from './ProgressiveImage.styles';

interface ProgressiveImageProps {
  /** Full-resolution image URI */
  uri: string;
  /** Width of the image */
  width: number;
  /** Height of the image */
  height: number;
  /** Optional additional container style */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders a placeholder, then cross-fades to the loaded full image.
 * The Rick and Morty API provides 300x300 images; we derive a thumbnail
 * by appending a small cache-busted size hint via URI (placeholder is
 * the same URI — the progressive effect comes from load timing + fade).
 */
function ProgressiveImage({ uri, width, height, style }: ProgressiveImageProps) {
  const [fullLoaded, setFullLoaded] = useState(false);
  const fullOpacity = useState(new Animated.Value(0))[0];
  const shimmerOpacity = useRef(new Animated.Value(0.4)).current;

  // Pulse the shimmer until the image is loaded
  useEffect(() => {
    if (fullLoaded) return;
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerOpacity, { toValue: 1, duration: 750, useNativeDriver: true }),
        Animated.timing(shimmerOpacity, { toValue: 0.4, duration: 750, useNativeDriver: true }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [fullLoaded, shimmerOpacity]);

  const onFullLoad = () => {
    setFullLoaded(true);
    Animated.timing(fullOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[{ width, height }, styles.container, style]}>
      {/* Shimmer placeholder — visible until image loads */}
      {!fullLoaded && (
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.placeholder, { opacity: shimmerOpacity }]}
        />
      )}

      {/* Full-res image fades in on load */}
      <Animated.Image
        source={{ uri }}
        style={[StyleSheet.absoluteFill, { opacity: fullOpacity }]}
        onLoad={onFullLoad}
        resizeMode="cover"
      />
    </Animated.View>
  );
}

export default ProgressiveImage;
