/**
 * @file features/episodes/screens/EpisodeListScreen.tsx
 * @description Paginated list of all 51 episodes grouped by season.
 * Season headers are injected as section dividers inside the flat data array.
 */

import React, { useCallback, useMemo, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { EpisodesStackParamList } from '../../../shared/types/navigation';
import type { Episode } from '../../../shared/types/api';
import { useEpisodes } from '../hooks/useEpisodes';
import useScrollHeader from '../../../shared/hooks/useScrollHeader';
import { Colors } from '../../../shared/utils/theme';
import styles from './EpisodeListScreen.styles';

type Props = NativeStackScreenProps<EpisodesStackParamList, 'EpisodeList'>;

// ── Season extraction helper ──────────────────────────────────────────────────

/** Derives season number from episode code e.g. "S02E05" → 2 */
function seasonFromCode(code: string): number {
  const match = code.match(/S(\d+)/i);
  return match ? parseInt(match[1], 10) : 0;
}

// ── List item types ───────────────────────────────────────────────────────────

type SectionItem = { type: 'section'; season: number };
type EpisodeItem = { type: 'episode'; data: Episode };
type ListItem = SectionItem | EpisodeItem;

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ season }: { season: number }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionLabel}>Season {season}</Text>
      <View style={styles.sectionLine} />
    </View>
  );
}

function EpisodeCard({
  episode,
  onPress,
}: {
  episode: Episode;
  onPress: (ep: Episode) => void;
}) {
  return (
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
}

function SkeletonEpisodeCard() {
  const opacity = useRef(new Animated.Value(0.4)).current;
  React.useEffect(() => {
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
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function EpisodeListScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const isFetchingRef = useRef(false);
  const { translateY, onScroll, headerHeight } = useScrollHeader();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useEpisodes();

  // Flatten pages and inject season section headers
  const listData = useMemo<ListItem[]>(() => {
    if (!data) return [];
    const episodes = data.pages.flatMap((p) => p.results);
    const items: ListItem[] = [];
    let lastSeason = -1;

    for (const ep of episodes) {
      const season = seasonFromCode(ep.episode);
      if (season !== lastSeason) {
        items.push({ type: 'section', season });
        lastSeason = season;
      }
      items.push({ type: 'episode', data: ep });
    }
    return items;
  }, [data]);

  const totalEpisodes = useMemo(
    () => data?.pages[0]?.info.count ?? 0,
    [data],
  );

  const handleLoadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage || isFetchingRef.current) return;
    isFetchingRef.current = true;
    fetchNextPage().finally(() => {
      isFetchingRef.current = false;
    });
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handlePress = useCallback(
    (episode: Episode) => {
      navigation.navigate('EpisodeDetail', {
        episodeId: episode.id,
        episodeName: episode.name,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => {
      if (item.type === 'section') {
        return <SectionHeader season={item.season} />;
      }
      return <EpisodeCard episode={item.data} onPress={handlePress} />;
    },
    [handlePress],
  );

  const getItemType = useCallback(
    (item: ListItem) => item.type,
    [],
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }, [isFetchingNextPage]);

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={[styles.header, { height: headerHeight }]}>
          <Text style={styles.headerTitle}>Episodes</Text>
          <Text style={styles.headerSubtitle}>Loading…</Text>
        </View>
        <View style={{ paddingTop: headerHeight }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonEpisodeCard key={i} />
          ))}
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, styles.centered, { paddingTop: insets.top }]}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Failed to load</Text>
        <Text style={styles.errorSubtitle}>Check your connection and try again.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Animated hide-on-scroll header */}
      <Animated.View
        style={[styles.header, { height: headerHeight, transform: [{ translateY }] }]}
      >
        <Text style={styles.headerTitle}>Episodes</Text>
        <Text style={styles.headerSubtitle}>
          {totalEpisodes} episodes across all seasons
        </Text>
      </Animated.View>

      <FlashList
        data={listData}
        keyExtractor={(item, index) =>
          item.type === 'section' ? `season-${item.season}` : `ep-${item.data.id}-${index}`
        }
        renderItem={renderItem}
        getItemType={getItemType}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={renderFooter}
        contentContainerStyle={[styles.listContent, { paddingTop: headerHeight }]}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
}
