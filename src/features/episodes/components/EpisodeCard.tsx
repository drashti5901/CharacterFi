/**
 * @file features/episodes/components/EpisodeCard.tsx
 * @description Episode list row (EpisodeCard), season divider (SectionHeader),
 * and animated shimmer skeleton (SkeletonEpisodeCard) used in EpisodeListScreen.
 */
import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import type { Episode } from '../../../shared/types/api';
import styles from './EpisodeCard.styles';

// ── Season section header ─────────────────────────────────────────────────────

export const SectionHeader = ({ season }: { season: number }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionLabel}>Season {season}</Text>
    <View style={styles.sectionLine} />
  </View>
);

// ── Episode card ──────────────────────────────────────────────────────────────

interface EpisodeCardProps {
  episode: Episode;
  onPress: (ep: Episode) => void;
}

export const EpisodeCard = ({ episode, onPress }: EpisodeCardProps) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => onPress(episode)}
    activeOpacity={0.75}
  >
    <View style={styles.episodeCodeBadge}>
      <Text style={styles.episodeCode}>{episode.episode}</Text>
    </View>
    <View style={styles.cardInfo}>
      <Text style={styles.cardName} numberOfLines={2}>
        {episode.name}
      </Text>
      <Text style={styles.cardDate}>{episode.air_date}</Text>
    </View>
    <Text style={styles.cardChevron}>›</Text>
  </TouchableOpacity>
);

// ── Skeleton card ─────────────────────────────────────────────────────────────

export const SkeletonEpisodeCard = () => {
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
