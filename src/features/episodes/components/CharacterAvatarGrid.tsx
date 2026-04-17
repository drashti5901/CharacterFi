/**
 * @file features/episodes/components/CharacterAvatarGrid.tsx
 * @description Grid of character avatar tiles shown on EpisodeDetailScreen.
 * Exports CharacterAvatarItem (tappable) and SkeletonAvatarItem (loading state).
 */
import React, { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { Character } from '../../../shared/types/api';
import ProgressiveImage from '../../../shared/components/ProgressiveImage';
import styles from './CharacterAvatarGrid.styles';

interface CharacterAvatarItemProps {
  character: Character;
  onPress: (c: Character) => void;
}

export const CharacterAvatarItem = ({ character, onPress }: CharacterAvatarItemProps) => {
  const size = useRef<number | null>(null);
  return (
    <TouchableOpacity
      style={styles.avatarWrapper}
      onPress={() => onPress(character)}
      activeOpacity={0.8}
      onLayout={(e) => { size.current = e.nativeEvent.layout.width; }}
    >
      <View style={styles.avatar}>
        <ProgressiveImage
          uri={character.image}
          width={size.current ?? 80}
          height={size.current ?? 80}
        style={{ width: '100%', height: undefined, aspectRatio: 1 }}
        />
      </View>
      <Text style={styles.avatarName} numberOfLines={1}>
        {character.name}
      </Text>
    </TouchableOpacity>
  );
};

export const SkeletonAvatarItem = () => (
  <View style={styles.avatarWrapper}>
    <View style={styles.skeletonAvatar} />
    <View style={styles.skeletonName} />
  </View>
);
