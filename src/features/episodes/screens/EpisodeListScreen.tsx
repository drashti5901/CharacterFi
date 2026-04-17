/**
 * @file features/episodes/screens/EpisodeListScreen.tsx
 * @description Paginated list of all episodes grouped by season.
 * Season headers are injected as section dividers within the flat FlashList data array.
 */
import React, { useCallback, useMemo, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { EpisodesStackParamList } from '../../../shared/types/navigation';
import type { Episode } from '../../../shared/types/api';
import { useEpisodes } from '../hooks/useEpisodes';
import useScrollHeader from '../../../shared/hooks/useScrollHeader';
import ErrorState from '../../../shared/components/ErrorState';
import { Colors } from '../../../shared/utils/theme';
import { EpisodeCard, SectionHeader, SkeletonEpisodeCard } from '../components/EpisodeCard';
import styles from './EpisodeListScreen.styles';

type Props = NativeStackScreenProps<EpisodesStackParamList, 'EpisodeList'>;

type SectionItem = { type: 'section'; season: number };
type EpisodeItem = { type: 'episode'; data: Episode };
type ListItem = SectionItem | EpisodeItem;

const seasonFromCode = (code: string): number => {
  const match = code.match(/S(\d+)/i);
  return match ? parseInt(match[1], 10) : 0;
};

const EpisodeListScreen = ({ navigation }: Props) => {
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

  const totalEpisodes = useMemo(() => data?.pages[0]?.info.count ?? 0, [data]);

  const handleLoadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage || isFetchingRef.current) return;
    isFetchingRef.current = true;
    fetchNextPage().finally(() => { isFetchingRef.current = false; });
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handlePress = useCallback(
    (episode: Episode) => {
      navigation.navigate('EpisodeDetail', { episodeId: episode.id, episodeName: episode.name });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) =>
      item.type === 'section'
        ? <SectionHeader season={item.season} />
        : <EpisodeCard episode={item.data} onPress={handlePress} />,
    [handlePress],
  );

  const renderFooter = useCallback(() =>
    isFetchingNextPage
      ? <View style={styles.footerLoader}><ActivityIndicator color={Colors.primary} size="large" /></View>
      : null,
    [isFetchingNextPage],
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={[styles.header, { height: headerHeight }]}>
          <Text style={styles.headerTitle}>Episodes</Text>
          <Text style={styles.headerSubtitle}>Loading…</Text>
        </View>
        <View style={{ paddingTop: headerHeight }}>
          {Array.from({ length: 8 }).map((_, i) => <SkeletonEpisodeCard key={i} />)}
        </View>
      </View>
    );
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} paddingTop={insets.top} />;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor={Colors.surface} barStyle="light-content" />
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
        getItemType={(item) => item.type}
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
};

export default EpisodeListScreen;

