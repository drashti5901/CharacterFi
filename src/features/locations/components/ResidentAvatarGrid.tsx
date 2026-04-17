/**
 * @file features/locations/components/ResidentAvatarGrid.tsx
 * @description Grid of resident character avatars on LocationDetailScreen.
 * Exports ResidentAvatarGrid (full grid), SkeletonAvatarItem (loading tile).
 */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { Character } from '../../../shared/types/api';
import ProgressiveImage from '../../../shared/components/ProgressiveImage';
import styles from './ResidentAvatarGrid.styles';

// ── Skeleton ──────────────────────────────────────────────────────────────────

export const SkeletonAvatarItem = () => (
  <View style={styles.avatarWrapper}>
    <View style={styles.skeletonAvatar} />
    <View style={styles.skeletonName} />
  </View>
);

// ── Single resident avatar ────────────────────────────────────────────────────

const ResidentAvatar = ({
  character,
  onPress,
}: {
  character: Character;
  onPress: (c: Character) => void;
}) => (
  <TouchableOpacity
    style={styles.avatarWrapper}
    onPress={() => onPress(character)}
    activeOpacity={0.8}
  >
    <View style={styles.avatar}>
      <ProgressiveImage
        uri={character.image}
        width={80}
        height={80}
        style={{ width: '100%', height: undefined, aspectRatio: 1 }}
      />
    </View>
    <Text style={styles.avatarName} numberOfLines={1}>
      {character.name}
    </Text>
  </TouchableOpacity>
);

// ── Grid ──────────────────────────────────────────────────────────────────────

interface ResidentAvatarGridProps {
  residents: Character[];
  isLoading: boolean;
  count: number;
  onPress: (c: Character) => void;
}

const ResidentAvatarGrid = ({ residents, isLoading, count, onPress }: ResidentAvatarGridProps) => (
  <>
    <Text style={styles.sectionTitle}>Residents ({count})</Text>
    {count === 0 ? (
      <View style={styles.noResidents}>
        <Text style={styles.noResidentsText}>No known residents</Text>
      </View>
    ) : (
      <View style={styles.grid}>
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => <SkeletonAvatarItem key={i} />)
          : residents.map((c) => <ResidentAvatar key={c.id} character={c} onPress={onPress} />)}
      </View>
    )}
  </>
);

export default ResidentAvatarGrid;
