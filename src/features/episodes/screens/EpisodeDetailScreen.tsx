/**
 * @file features/episodes/screens/EpisodeDetailScreen.tsx
 * @description Episode detail — meta info + lazy-loaded character avatar grid.
 * Characters are fetched by batch IDs extracted from the episode's character URLs.
 */

import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { EpisodesStackParamList } from '../../../shared/types/navigation';
import type { Character } from '../../../shared/types/api';
import { fetchEpisodeById } from '../../../api/episodes';
import { fetchCharactersByIds } from '../../../api/characters';
import ProgressiveImage from '../../../shared/components/ProgressiveImage';
import useScrollHeader from '../../../shared/hooks/useScrollHeader';
import { Colors } from '../../../shared/utils/theme';
import styles from './EpisodeDetailScreen.styles';

type Props = NativeStackScreenProps<EpisodesStackParamList, 'EpisodeDetail'>;

// ── Helpers ───────────────────────────────────────────────────────────────────

function idsFromUrls(urls: string[]): number[] {
  return urls.map((u) => Number(u.split('/').pop())).filter(Boolean);
}

// ── Skeleton grid item ────────────────────────────────────────────────────────

function SkeletonAvatarItem() {
  return (
    <View style={styles.avatarWrapper}>
      <View style={styles.skeletonAvatar} />
      <View style={styles.skeletonName} />
    </View>
  );
}

// ── Character avatar item ─────────────────────────────────────────────────────

function CharacterAvatarItem({
  character,
  onPress,
}: {
  character: Character;
  onPress: (c: Character) => void;
}) {
  const size = useRef<number | null>(null);

  return (
    <TouchableOpacity
      style={styles.avatarWrapper}
      onPress={() => onPress(character)}
      activeOpacity={0.8}
      onLayout={(e) => {
        size.current = e.nativeEvent.layout.width;
      }}
    >
      <View style={styles.avatar}>
        <ProgressiveImage
          uri={character.image}
          width={size.current ?? 80}
          height={size.current ?? 80}
          style={{ width: '100%' as any, height: undefined, aspectRatio: 1 }}
        />
      </View>
      <Text style={styles.avatarName} numberOfLines={1}>
        {character.name}
      </Text>
    </TouchableOpacity>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function EpisodeDetailScreen({ navigation, route }: Props) {
  const { episodeId } = route.params;
  const insets = useSafeAreaInsets();
  const [heroHeight, setHeroHeight] = useState(0);
  const { translateY, onScroll } = useScrollHeader(heroHeight);

  // Fetch episode metadata
  const episodeQuery = useQuery({
    queryKey: ['episodes', 'detail', episodeId],
    queryFn: () => fetchEpisodeById(episodeId),
    staleTime: 10 * 60 * 1000,
  });

  const episode = episodeQuery.data;
  const characterIds = episode ? idsFromUrls(episode.characters) : [];

  // Lazy-load characters only after episode loaded
  const charactersQuery = useQuery({
    queryKey: ['characters', 'byIds', characterIds],
    queryFn: () => fetchCharactersByIds(characterIds),
    enabled: characterIds.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  const handleCharacterPress = useCallback(
    (character: Character) => {
      // Navigate into the Characters stack detail via cross-tab navigation
      navigation.getParent()?.navigate('Characters', {
        screen: 'CharacterDetail',
        params: { characterId: character.id },
      });
    },
    [navigation],
  );

  // ── Loading ────────────────────────────────────────────────────────────────
  if (episodeQuery.isLoading) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (episodeQuery.isError || !episode) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Failed to load</Text>
        <Text style={styles.errorSubtitle}>Check your connection and try again.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => episodeQuery.refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const characters = charactersQuery.data ?? [];
  const isCharactersLoading = charactersQuery.isLoading;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* ── Animated hide-on-scroll hero ── */}
      <Animated.View
        style={[styles.heroContainer, { transform: [{ translateY }] }]}
        onLayout={(e) => setHeroHeight(e.nativeEvent.layout.height)}
      >
        <View style={styles.hero}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
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

      {/* ── Scrollable content ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: heroHeight, paddingBottom: insets.bottom + 24 },
        ]}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Character grid ── */}
        <Text style={styles.sectionTitle}>Characters</Text>

        <View style={styles.grid}>
          {isCharactersLoading
            ? Array.from({ length: 12 }).map((_, i) => (
                <SkeletonAvatarItem key={i} />
              ))
            : characters.map((c) => (
                <CharacterAvatarItem
                  key={c.id}
                  character={c}
                  onPress={handleCharacterPress}
                />
              ))}
        </View>
      </ScrollView>
    </View>
  );
}
