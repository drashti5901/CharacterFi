/**
 * @file features/episodes/components/EpisodeHero.tsx
 * @description Animated hero banner at the top of EpisodeDetailScreen.
 * Contains back button, episode code badge, title, air date, and character count.
 */
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import type { Episode } from '../../../shared/types/api';
import styles from './EpisodeHero.styles';

interface EpisodeHeroProps {
  episode: Episode;
  onBack: () => void;
  onLayout: (height: number) => void;
  translateY: Animated.Value;
}

const EpisodeHero = ({ episode, onBack, onLayout, translateY }: EpisodeHeroProps) => (
  <Animated.View
    style={[styles.heroContainer, { transform: [{ translateY }] }]}
    onLayout={(e) => onLayout(e.nativeEvent.layout.height)}
  >
    <View style={styles.hero}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      <View style={styles.heroTop}>
        <View style={styles.codeBadge}>
          <Text style={styles.codeText}>{episode.episode}</Text>
        </View>
        <Text style={styles.episodeName}>{episode.name}</Text>
      </View>

      <Text style={styles.airDate}>🗓  {episode.air_date}</Text>
      <Text style={styles.characterCount}>
        👥  {episode.characters.length} characters
      </Text>
    </View>
  </Animated.View>
);

export default EpisodeHero;
