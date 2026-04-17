/**
 * @file features/characters/components/EpisodeCard.tsx
 * @description Episode chip card and skeleton displayed on CharacterDetailScreen.
 * Tapping navigates to the EpisodeDetail screen.
 */
import React from 'react';
import { Animated, Text, TouchableOpacity } from 'react-native';
import type { Episode } from '../../../shared/types/api';
import styles from './EpisodeCard.styles';

interface EpisodeCardProps {
  episode: Episode;
  onPress: (ep: Episode) => void;
}

export const EpisodeCard = ({ episode, onPress }: EpisodeCardProps) => (
  <TouchableOpacity
    style={styles.episodeCard}
    onPress={() => onPress(episode)}
    activeOpacity={0.7}
  >
    <Text style={styles.episodeCode}>{episode.episode}</Text>
    <Text style={styles.episodeName} numberOfLines={2}>
      {episode.name}
    </Text>
    <Text style={styles.episodeDate}>{episode.air_date}</Text>
  </TouchableOpacity>
);

export const EpisodeSkeleton = () => (
  <Animated.View style={styles.episodeSkeletonCard} />
);
