/**
 * @file features/characters/components/CharacterCard.tsx
 * @description Card component showing avatar, name, status badge,
 * species and last known location for a single character.
 * Press triggers a Reanimated scale + shadow animation.
 */

import React, { memo } from 'react';
import { Text, View } from 'react-native';
import Animated, {
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
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <Pressable
        style={styles.pressable}
        onPress={() => onPress(character)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        android_ripple={{ color: Colors.border }}
      >
        <ProgressiveImage uri={character.image} width={100} height={100} />

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
    </Animated.View>
  );
}

export default memo(CharacterCard);
