import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import type { Location } from '../../../shared/types/api';
import { iconForType } from '../utils/locationUtils';
import styles from './LocationCard.styles';

// ── Location card ─────────────────────────────────────────────────────────────

interface LocationCardProps {
  location: Location;
  onPress: (l: Location) => void;
}

export const LocationCard = ({ location, onPress }: LocationCardProps) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => onPress(location)}
    activeOpacity={0.75}
  >
    <View style={styles.iconBox}>
      <Text style={styles.locationIcon}>{iconForType(location.type)}</Text>
    </View>
    <View style={styles.cardInfo}>
      <Text style={styles.cardName} numberOfLines={1}>
        {location.name}
      </Text>
      <View style={styles.cardMeta}>
        {location.type ? (
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{location.type}</Text>
          </View>
        ) : null}
        <Text style={styles.dimensionText} numberOfLines={1}>
          {location.dimension || 'Unknown dimension'}
        </Text>
      </View>
    </View>
    <Text style={styles.cardChevron}>›</Text>
  </TouchableOpacity>
);

// ── Skeleton card ─────────────────────────────────────────────────────────────

export const SkeletonLocationCard = () => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 750, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 750, useNativeDriver: true }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return <Animated.View style={[styles.skeletonCard, { opacity }]} />;
};
