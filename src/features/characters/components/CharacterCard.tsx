/**
 * @file features/characters/components/CharacterCard.tsx
 * @description Card component showing avatar, name, status badge,
 * species and last known location for a single character.
 * Press triggers a Reanimated scale + shadow animation.
 * The avatar participates in a shared element transition to the detail screen.
 */

import React, { memo } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';
import ProgressiveImage from '../../../shared/components/ProgressiveImage';
import { Colors } from '../../../shared/utils/theme';
import styles from './CharacterCard.styles';
import type { Character } from '../../../shared/types/api';

interface CharacterCardProps {
  character: Character;
  onPress: (character: Character) => void;
}

/** Maps status to a theme colour */
const STATUS_COLOR: Record<Character['status'], string> = {
  Alive: Colors.alive,
  Dead: Colors.dead,
  unknown: Colors.unknown,
};

function CharacterCard({ character, onPress }: CharacterCardProps) {
  const statusColor = STATUS_COLOR[character.status] ?? Colors.unknown;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    // iOS shadow
    shadowOpacity: interpolate(scale.value, [0.96, 1], [0.08, 0.25]),
    shadowRadius: interpolate(scale.value, [0.96, 1], [3, 8]),
    // Android elevation
    elevation: interpolate(scale.value, [0.96, 1], [2, 8]),
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.cardInner}>
        <Pressable
          style={styles.pressable}
          onPress={() => onPress(character)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          android_ripple={{ color: Colors.border }}
        >
          <Animated.View sharedTransitionTag={`char-avatar-${character.id}`}>
            <ProgressiveImage uri={character.image} width={100} height={100} />
          </Animated.View>

          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {character.name}
            </Text>

            {/* Status badge */}
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
              <Text style={[styles.statusText, { color: statusColor }]}>
                {character.status}
              </Text>
              <Text style={styles.speciesSeparator}> · </Text>
              <Text style={styles.species} numberOfLines={1}>
                {character.species}
              </Text>
            </View>

            {/* Last known location */}
            <Text style={styles.locationLabel}>Last known location</Text>
            <Text style={styles.locationName} numberOfLines={1}>
              {character.location.name}
            </Text>
          </View>
        </Pressable>
      </View>
    </Animated.View>
  );
}

export default memo(CharacterCard);
